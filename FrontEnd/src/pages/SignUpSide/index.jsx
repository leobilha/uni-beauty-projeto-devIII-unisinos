import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import InputMask from 'react-input-mask';
import PersonAddIcon from '@mui/icons-material/PersonAdd'; // Importe o ícone de cadastro

const defaultTheme = createTheme();

export default function SignUpSide() {
  const [userType, setUserType] = React.useState('cliente');

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      userType: userType,
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      cnpj: data.get('cnpj'),
      cpf: data.get('cpf'),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
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
            Inscrever-se
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
              <Grid item xs={12} sm={userType !== 'loja' ? 6 : 12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label={userType === 'loja' ? 'Razão Social' : 'Primeiro Nome'}
                  autoFocus
                />
              </Grid>
              {userType === 'cliente' && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Último Nome"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Endereço de E-mail"
                  name="email"
                  autoComplete="email"
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
                />
              </Grid>
              {userType === 'loja' && (
                <Grid item xs={12}>
                  <InputMask
                    mask="99.999.999/9999-99"
                    maskChar={null}
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
            >
              Inscrever-se
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
