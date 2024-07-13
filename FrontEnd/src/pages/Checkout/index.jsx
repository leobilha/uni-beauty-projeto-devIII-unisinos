import React, { useState, useCallback } from "react";
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Box,
  Button,
  Card,
  CardContent,
  CssBaseline,
  Grid,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  OutlinedInput,
  FormLabel,
  styled,
} from '@mui/material';
import { ChevronLeftRounded, ChevronRightRounded, CreditCardRounded, SimCardRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Loader from "../../components/Loader";
import { Order } from "../../utils/Request/ControllerOrder";
import { alertaErro, alertaSucesso } from "../../functions/functions";

const steps = ['Endereço de entrega', 'Detalhes do pagamento', 'Revisar seu pedido'];

const FormGrid = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const products = [
  { name: 'Plano Profissional', desc: 'Assinatura mensal', price: 'R$15,00' },
  { name: 'Suporte dedicado', desc: 'Incluído no Plano Profissional', price: 'Grátis' },
  { name: 'Hardware', desc: 'Dispositivos necessários para desenvolvimento', price: 'R$69,99' },
  { name: 'Template de página de aterrissagem', desc: 'Licença', price: 'R$49,99' },
];

const addresses = ['1 MUI Drive', 'Reactville', 'Qualquer cidade', '99999', 'EUA'];
const payments = [
  { name: 'Tipo de cartão:', detail: 'Visa' },
  { name: 'Titular do cartão:', detail: 'Sr. João da Silva' },
  { name: 'Número do cartão:', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Data de validade:', detail: '04/2024' },
];

function AddressForm({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, address: { ...prev.address, [name]: value } }));
  };

  return (
    <Grid container spacing={3}>
      <Box sx={{ display: 'flex', marginTop: 2, flexDirection: 'column', width: '100%', gap: 2 }}>
        <FormGrid item sx={{ flexGrow: 1 }}>
          <FormLabel htmlFor="name" required>Nome</FormLabel>
          <OutlinedInput id="name" name="name" type="text" placeholder="João" autoComplete="name" required onChange={handleChange} />
        </FormGrid>
        <FormGrid item sx={{ flexGrow: 1 }}>
          <FormLabel htmlFor="address1" required>Endereço</FormLabel>
          <OutlinedInput id="address1" name="address1" type="text" placeholder="Nome da rua e número" autoComplete="shipping address-line1" required onChange={handleChange} />
        </FormGrid>
      </Box>
      <Box sx={{ display: 'flex', marginTop: 2, width: '100%', gap: 3 }}>
        <FormGrid item sx={{ flexGrow: 1 }}>
          <FormLabel htmlFor="email" required>Email</FormLabel>
          <OutlinedInput id="email" name="email" type="email" placeholder="email@example.com" autoComplete="email" required onChange={handleChange} />
        </FormGrid>
        <FormGrid item sx={{ flexGrow: 1 }}>
          <FormLabel htmlFor="phone" required>Telefone</FormLabel>
          <OutlinedInput id="phone" name="phone" type="text" placeholder="(XX) XXXX-XXXX" autoComplete="phone" required onChange={handleChange} />
        </FormGrid>
        <FormGrid item sx={{ flexGrow: 1 }}>
          <FormLabel htmlFor="city" required>Cidade</FormLabel>
          <OutlinedInput id="city" name="city" type="text" placeholder="São Paulo" autoComplete="city" required onChange={handleChange} />
        </FormGrid>
      </Box>
      <Box sx={{ display: 'flex', marginTop: 2, width: '100%', gap: 3 }}>
        <FormGrid item sx={{ flexGrow: 1 }}>
          <FormLabel htmlFor="zip" required>CEP</FormLabel>
          <OutlinedInput id="zip" name="zip" type="text" placeholder="12345-678" autoComplete="shipping postal-code" required onChange={handleChange} />
        </FormGrid>
        <FormGrid item sx={{ flexGrow: 1 }}>
          <FormLabel htmlFor="state" required>Estado</FormLabel>
          <OutlinedInput id="state" name="state" type="text" placeholder="SP" autoComplete="state" required onChange={handleChange} />
        </FormGrid>
        <FormGrid item sx={{ flexGrow: 1 }}>
          <FormLabel htmlFor="country" required>País</FormLabel>
          <OutlinedInput id="country" name="country" type="text" placeholder="Brasil" autoComplete="shipping country" required onChange={handleChange} />
        </FormGrid>
      </Box>
    </Grid>
  );
}

function PaymentForm({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, payment: { ...prev.payment, [name]: value } }));
  };

  const [paymentType, setPaymentType] = React.useState('creditCard');
  const [cardNumber, setCardNumber] = React.useState('');
  const [cvv, setCvv] = React.useState('');
  const [expirationDate, setExpirationDate] = React.useState('');

  const handleCardNumberChange = (event) => {
    const value = event.target.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    if (value.length <= 16) {
      setCardNumber(formattedValue);
      handleChange({ target: { name: 'cardNumber', value: formattedValue } });
    }
  };

  const handleCvvChange = (event) => {
    const value = event.target.value.replace(/\D/g, '');
    if (value.length <= 3) {
      setCvv(value);
      handleChange({ target: { name: 'cvv', value } });
    }
  };

  const handleExpirationDateChange = (event) => {
    const value = event.target.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{2})(?=\d{2})/, '$1/');
    if (value.length <= 4) {
      setExpirationDate(formattedValue);
      handleChange({ target: { name: 'expirationDate', value: formattedValue } });
    }
  };

  return (
    <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
      {paymentType === 'creditCard' && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 3, height: { xs: 300, sm: 350, md: 375 }, width: '100%', borderRadius: '20px', border: '1px solid ', borderColor: 'divider', backgroundColor: 'background.paper', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="subtitle2">Cartão de crédito</Typography>
              <CreditCardRounded sx={{ color: 'text.secondary' }} />
            </Box>
            <SimCardRounded sx={{ fontSize: { xs: 48, sm: 56 }, transform: 'rotate(90deg)', color: 'text.secondary' }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: 2 }}>
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="cardNumber" required>Número do cartão</FormLabel>
                <OutlinedInput id="cardNumber" autoComplete="card-number" placeholder="0000 0000 0000 0000" required value={cardNumber} onChange={handleCardNumberChange} />
              </FormGrid>
              <FormGrid sx={{ maxWidth: '20%' }}>
                <FormLabel htmlFor="cvv" required>CVV</FormLabel>
                <OutlinedInput id="cvv" name="cvv" autoComplete="cc-csc" placeholder="***" required value={cvv} onChange={handleCvvChange} />
              </FormGrid>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: 2 }}>
              <FormGrid item sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="nameOnCard" required>Nome no cartão</FormLabel>
                <OutlinedInput id="nameOnCard" name="nameOnCard" autoComplete="cc-name" placeholder="Nome impresso no cartão" required onChange={handleChange} />
              </FormGrid>
              <FormGrid sx={{ maxWidth: '40%' }}>
                <FormLabel htmlFor="expirationDate" required>Data de validade</FormLabel>
                <OutlinedInput id="expirationDate" name="expirationDate" autoComplete="cc-exp" placeholder="MM/AA" required value={expirationDate} onChange={handleExpirationDateChange} />
              </FormGrid>
            </Box>
          </Box>
        </Box>
      )}
    </Stack>
  );
}

function ReviewOrder({ formData }) {
  return (
    <React.Fragment>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            R$134,98
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Endereço de entrega
          </Typography>
          <Typography gutterBottom>{formData.address.name}</Typography>
          <Typography gutterBottom>{Object.values(formData.address).join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Detalhes do pagamento
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <Grid item xs={6} key={payment.name}>
                <Typography gutterBottom>{payment.name}</Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    address: {
      name: '',
      address1: '',
      email: '',
      phone: '',
      city: '',
      zip: '',
      state: '',
      country: ''
    },
    payment: {
      cardNumber: '',
      nameOnCard: '',
      cvv: '',
      expirationDate: ''
    }
  });

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      const postOrderDto = {
        number: Math.floor(100000 + Math.random() * 900000),
        emailUser: formData.address.email,
        cardNumber: parseInt(formData.payment.cardNumber, 10),
        typeUser: 'l',
        address: {
          completeAddress: formData.address.address1,
          email: formData.address.email,
          phone: formData.address.phone,
          city: formData.address.city,
          zipCode: formData.address.zip,
          state: formData.address.state,
          country: formData.address.country
        }
      };

      Order(postOrderDto)
        .then((res) => {
          (async () => await render(res))();
          alertaSucesso({ message: res.data.message });
        })
        .catch((err) => {
          if (err.message.includes("timeout")) {
            alertaErro({ message: "Tempo de espera excedido" });
          } else if (err.message.includes("Network")) {
            alertaErro({ message: "Servidor fora de uso" });
          } else {
            alertaErro(err.message);
          }
          setIsLoading(false);
        });
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleNavigateToDashboard = () => {
    navigate('/dashboard');
  };

  const render = useCallback(async (res) => {
    if (res.data && (res.data.status === "Erro") ||
      (res.data.status === "Warning")) {
      setIsLoading(false);
      alertaErro(res.data.message);
    } else if (res.data) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
      alertaErro("Não foi possível realizar a operação.");
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '1200px', width: '100%', mx: 'auto', my: 2 }}>
        <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', boxShadow: 5 }}>
          <CardContent sx={{ width: '100%' }}>
            <Typography component="h1" variant="h4" align="center">Finalize seu Pagamento</Typography>

            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </CardContent>
          <Divider />
          <CardContent sx={{ width: '100%' }}>
            {activeStep === steps.length ? (
              <React.Fragment>
              <Typography variant="h5" gutterBottom>Obrigado pelo seu pedido.</Typography>
              <Typography variant="subtitle1">Seu número de pedido é #2001539. Enviaremos uma confirmação do pedido, assim que o pagamento for processado.</Typography>
              <Button onClick={() => navigate('/dashboard')} sx={{ mt: 3 }}>Finalizar</Button>
            </React.Fragment>
            ) : (
              <Box>
                {activeStep === 0 && <AddressForm formData={formData} setFormData={setFormData} />}
                {activeStep === 1 && <PaymentForm formData={formData} setFormData={setFormData} />}
                {activeStep === 2 && <ReviewOrder formData={formData} />}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mr: 1 }}>
                      <ChevronLeftRounded /> Voltar
                    </Button>
                  )}
                  <Button variant="contained" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Fazer pedido' : 'Próximo'}
                    {activeStep === steps.length - 1 ? null : <ChevronRightRounded />}
                  </Button>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>

                  <Button
                    variant="outlined"
                    sx={{
                      width: { xs: '100%', sm: 'auto' },
                    }}
                    onClick={handleNavigateToDashboard}
                  >
                    Voltar ao Dashboard
                  </Button>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
}

AddressForm.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};

PaymentForm.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};
