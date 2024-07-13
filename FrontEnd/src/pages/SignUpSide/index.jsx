import React, { useState, useCallback } from "react";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import InputMask from 'react-input-mask';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from 'react-router-dom';

import Loader from "../../components/Loader";

import { Register } from "../../utils/Request/ControllerRegister";
import { alertaErro, alertaSucesso } from "../../functions/functions";
import { removeSpecialCharacters } from "../../utils/Utils";


const defaultTheme = createTheme();

export default function SignUpSide() {
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('userType');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [renderizaPagina, setRenderizaPagina] = useState(false);
  const [userType, setUserType] = React.useState('cliente');
  const [formErrors, setFormErrors] = React.useState({});
  const [formValues, setFormValues] = React.useState({
    fullName: '',
    email: '',
    password: '',
    cnpj: '',
    cpf: '',
  });

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
    setFormErrors({});
  };

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
    setFormErrors({
      ...formErrors,
      [event.target.name]: '',
    });
  };

  const validateForm = () => {
    let errors = {};
    if (!formValues.fullName || formValues.fullName.length < 5) {
      errors.fullName = 'O nome deve ter pelo menos 5 caracteres';
    }
    if (!formValues.email || formValues.email.length < 8) {
      errors.email = 'O e-mail deve ter pelo menos 8 caracteres';
    }
    if (!formValues.password || formValues.password.length < 8) {
      errors.password = 'A senha deve ter pelo menos 8 caracteres';
    }
    if (userType === 'loja') {
      if (!formValues.cnpj || formValues.cnpj.replace(/[^\d]/g, '').length < 14) {
        errors.cnpj = 'O CNPJ deve ter pelo menos 14 caracteres';
      }
    }
    if (userType === 'cliente') {
      if (!formValues.cpf || formValues.cpf.replace(/[^\d]/g, '').length < 11) {
        errors.cpf = 'O CPF deve ter pelo menos 11 caracteres';
      }
    }
    return errors;
  };

  const handleSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length === 0) {
      
      const data = {
        name: formValues.fullName,
        email: formValues.email,
        password: formValues.password,
        document: userType === 'cliente' ? removeSpecialCharacters(formValues.cpf) : removeSpecialCharacters(formValues.cnpj),
        type: userType === 'cliente' ? 'c' : 'l',
      };

      Register(data)
        .then((res) => {
          (async () => await render(res))();
        })
        .catch((err) => {
          if (err.message.includes("timeout")) {
            alertaErro({ message: "Tempo de espera excedido" });
          } else if (err.message.includes("Network")) {
            alertaErro({ message: "Servidor fora de uso" });
          }  else {
            alertaErro(err.message);
          }
          setIsLoading(false);
        });
    };
  }

  const render = useCallback(async (res) => {
    if (res.data && (res.data.status === "Erro") ||
      (res.data.status === "Warning")) {
      setIsLoading(false);
      alertaErro(res.data.message);
    } else if (res.data) {
      setRenderizaPagina(true);
      setIsLoading(false);
      alertaSucesso(res.data.message);
      navigate('/login');
    } else {
      setIsLoading(false);
      alertaErro("Não foi possível realizar a operação.");
    }
  }, []);

  const isFormValid = () => {
    const errors = validateForm();
    return Object.keys(errors).length === 0;
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        {isLoading && <Loader />}
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <PersonAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cadastre-se
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <FormControl component="fieldset" sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
              <RadioGroup
                row
                aria-label="user-type"
                name="user-type"
                value={userType}
                onChange={handleUserTypeChange}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <FormControlLabel value="cliente" control={<Radio />} label="Sou Cliente" />
                <FormControlLabel value="loja" control={<Radio />} label="Sou uma Loja" />
              </RadioGroup>
            </FormControl>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="fullName"
                  required
                  fullWidth
                  id="fullName"
                  label={userType === 'loja' ? 'Razão Social' : 'Nome Completo'}
                  autoFocus
                  onChange={handleChange}
                  error={!!formErrors.fullName}
                  helperText={formErrors.fullName || ' '}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Endereço de E-mail"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  error={!!formErrors.email}
                  helperText={formErrors.email || ' '}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                  error={!!formErrors.password}
                  helperText={formErrors.password || ' '}
                />
              </Grid>
              {userType === 'loja' && (
                <Grid item xs={12}>
                  <InputMask
                    mask="99.999.999/9999-99"
                    maskChar={null}
                    value={formValues.cnpj}
                    onChange={handleChange}
                  >
                    {(inputProps) => (
                      <TextField
                        {...inputProps}
                        required
                        fullWidth
                        name="cnpj"
                        label="CNPJ"
                        id="cnpj"
                        autoComplete="cnpj"
                        error={!!formErrors.cnpj}
                        helperText={formErrors.cnpj || ' '}
                      />
                    )}
                  </InputMask>
                </Grid>
              )}
              {userType === 'cliente' && (
                <Grid item xs={12}>
                  <InputMask
                    mask="999.999.999-99"
                    maskChar={null}
                    value={formValues.cpf}
                    onChange={handleChange}
                  >
                    {(inputProps) => (
                      <TextField
                        {...inputProps}
                        required
                        fullWidth
                        name="cpf"
                        label="CPF"
                        id="cpf"
                        autoComplete="cpf"
                        error={!!formErrors.cpf}
                        helperText={formErrors.cpf || ' '}
                      />
                    )}
                  </InputMask>
                </Grid>
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!isFormValid()}
            >
              Cadastre-se
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/login" variant="body2">
                  Já tem uma conta? Faça agora mesmo Login!
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
