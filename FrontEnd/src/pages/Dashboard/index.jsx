import * as React from 'react';
import { Box, Grid, Paper, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.grey[200],
  '&:hover': {
    backgroundColor: theme.palette.grey[300],
  },
}));

const ClickableItem = styled(Item)(({ theme }) => ({
  cursor: 'pointer',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const BackgroundImage = styled('div')({
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userType');
    navigate('/login');
  };

  const handleModuleClick = (module) => {
    navigate('/checkout');
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Bem-vindo ao Uni Beauty!
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Selecione um módulo para continuar.
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <ClickableItem onClick={() => handleModuleClick(1)}>
            <BackgroundImage style={{ backgroundImage: 'url(https://source.unsplash.com/random/800x600?payment)' }}>
              Realizar Pagamento
            </BackgroundImage>
          </ClickableItem>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <BackgroundImage style={{ backgroundImage: 'url(https://source.unsplash.com/random/800x600?products)' }}>
              Minhas Compras
            </BackgroundImage>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <BackgroundImage style={{ backgroundImage: 'url(https://source.unsplash.com/random/800x600?shopping)' }}>
              Adicionar Produtos
            </BackgroundImage>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <BackgroundImage style={{ backgroundImage: 'url(https://source.unsplash.com/random/800x600?supplier)' }}>
              Fornecedores
            </BackgroundImage>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <BackgroundImage style={{ backgroundImage: 'url(https://source.unsplash.com/random/800x600?services)' }}>
              Adicionar Serviços
            </BackgroundImage>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <BackgroundImage style={{ backgroundImage: 'url(https://source.unsplash.com/random/800x600?reports)' }}>
              Relatórios
            </BackgroundImage>
          </Item>
        </Grid>
      </Grid>
      <Box sx={{ mt: 4 }}>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Sair
        </Button>
      </Box>
    </Box>
  );
}
