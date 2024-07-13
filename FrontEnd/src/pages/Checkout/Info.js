import * as React from 'react';
import PropTypes from 'prop-types';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const products = [
  {
    name: 'Plano Profissional',
    desc: 'Assinatura mensal',
    price: 'R$15,00',
  },
  {
    name: 'Suporte dedicado',
    desc: 'Incluído no Plano Profissional',
    price: 'Grátis',
  },
  {
    name: 'Hardware',
    desc: 'Dispositivos necessários para desenvolvimento',
    price: 'R$69,99',
  },
  {
    name: 'Template de página de aterrissagem',
    desc: 'Licença',
    price: 'R$49,99',
  },
];

function Info({ totalPrice }) {
  const navigate = useNavigate();

  const handleNavigateToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <React.Fragment>
      <Typography variant="subtitle2" color="text.secondary">
        Total
      </Typography>
      <Typography variant="h4" gutterBottom>
        {totalPrice}
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText
              sx={{ mr: 2 }}
              primary={product.name}
              secondary={product.desc}
            />
            <Typography variant="body1" fontWeight="medium">
              {product.price}
            </Typography>
          </ListItem>
        ))}
      </List>

      <Button
        variant="outlined"
        sx={{
          alignSelf: 'start',
          top: '50px',
          width: { xs: '100%', sm: 'auto' },
        }}
        onClick={handleNavigateToDashboard}
      >
        Voltar ao Dashboard
      </Button>
    </React.Fragment>
  );
}

Info.propTypes = {
  totalPrice: PropTypes.string.isRequired,
};

export default Info;
