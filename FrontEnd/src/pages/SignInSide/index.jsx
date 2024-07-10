import React, { useState, useCallback } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Background from '../../assets/img/imagemPrincipal.png';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

import Loader from "../../components/Loader";
import { Login } from "../../utils/Request/ControllerLogin";
import { alertaErro } from "../../functions/functions";

const defaultTheme = createTheme();

export default function SignInSide() {
  const [isLoading, setIsLoading] = useState(false);
  const [renderizaPagina, setRenderizaPagina] = useState(false);
  const navigate = useNavigate();
  const [userType, setUserType] = useState('cliente');
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
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
    if (!formValues.email || formValues.email.length < 8) {
      errors.email = 'O e-mail deve ter pelo menos 8 caracteres';
    }
    if (!formValues.password || formValues.password.length < 8) {
      errors.password = 'A senha deve ter pelo menos 8 caracteres';
    }
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      const data = {
        email: formValues.email,
        type: userType === 'cliente' ? 'c' : 'l',
        password: formValues.password
      };

      setIsLoading(true);
      Login(data)
        .then((res) => {
          (async () => await render(res))();
          if (res.data.status != "Erro") {
            if (res.data === 'c') {
              navigate('/purchase');
            } else if (res.data === 'l') {
              navigate('/dashboard');
            } else {
              navigate('/login');
            }
          }
        })
        .catch((err) => {
          if (err.message.includes("timeout")) {
            alertaErro({ message: "Tempo de espera excedido" });
          } else {
            alertaErro(err.message);
          }
          setIsLoading(false);
        });
    } else {
      setFormErrors(errors);
    }
  };

  const render = useCallback(async (res) => {
    if (res.data && (res.data.status === "Erro") ||
      (res.data.status === "Warning")) {
      setIsLoading(false);
      alertaErro(res.data.message);
    } else if (res.data) {
      setRenderizaPagina(true);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      alertaErro("Não foi possível realizar a operação.");
    }
  }, []);

  const isButtonEnabled = formValues.email.length > 0 && formValues.password.length > 0;

  return (
    <ThemeProvider theme={defaultTheme}>
      {isLoading && <Loader />}
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${Background})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <FormControl component="fieldset" sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                <RadioGroup
                  row
                  aria-label="user-type"
                  name="user-type"
                  value={userType}
                  onChange={handleUserTypeChange}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  <FormControlLabel value="cliente" control={<Radio />} label="Cliente" />
                  <FormControlLabel value="loja" control={<Radio />} label="Loja" />
                </RadioGroup>
              </FormControl>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChange}
                error={!!formErrors.email}
                helperText={formErrors.email || ' '}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                error={!!formErrors.password}
                helperText={formErrors.password || ' '}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!isButtonEnabled}
              >
                Acessar
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/criar" variant="body2">
                    {"Não tem uma conta? Cadastre-se!"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
