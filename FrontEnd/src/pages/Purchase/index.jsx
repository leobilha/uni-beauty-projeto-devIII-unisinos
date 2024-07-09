import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Paper, Typography, Button } from '@mui/material';

const defaultTheme = createTheme();

export default function SignInSide() {
  const navigate = useNavigate();
  const [userType, setUserType] = React.useState('cliente');

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    if (email === 'usuario@exemplo.com' && password === 'senha123') {
      if (userType === 'cliente') {
        navigate('/cliente');
      } else {
        navigate('/dashboard');
      }
    } else {
      alert('Login ou senha incorretos');
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Bem-vindo ao Uni Beauty!
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Sair
        </Button>
      </Box>
    </Box>
  );
}
