"use client";

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
import { ThemeProvider } from '@mui/material/styles';
import { CheckCircleOutline } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { theme } from '@/theme/theme';
import { useError } from '@/context/ErrorContext';

export default function SignUp() {
  const router = useRouter();
  const { setError } = useError();

  const [userNameError, setUserNameError] = React.useState(false);
  const [userEmailError, setUserEmailError] = React.useState(false);
  const [userPasswordError, setUserPasswordError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userName = data.get('userName') as string;
    const userEmail = data.get('userEmail') as string;
    const userPassword = data.get('userPassword') as string;

    if (!userName || !userEmail || !userPassword) {
      setHelperText('Todos os campos são obrigatórios.');
      setUserNameError(!userName);
      setUserEmailError(!userEmail);
      setUserPasswordError(!userPassword);
      return;
    }

    setUserNameError(false);
    setUserEmailError(false);
    setUserPasswordError(false);
    setHelperText('');

    const signinObject = JSON.stringify({ userName, userEmail, userPassword });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: signinObject,
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falha ao registrar usuário');
      }

      const result = await response.json();
      setSuccessMessage('Usuário criado com sucesso! Redirecionando...');
      setTimeout(() => {
        router.push('/Home');
      }, 2000);
    } catch (error: any) {
      setError(error.message);
      setHelperText('Erro ao registrar. Tente novamente.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cadastro
          </Typography>
          {successMessage ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                marginTop: 4,
                padding: 3,
                borderRadius: 2,
                backgroundColor: theme.palette.success.light,
                color: theme.palette.success.contrastText,
              }}
            >
              <CheckCircleOutline sx={{ fontSize: 50, color: '#46db46' }} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                {successMessage}
              </Typography>
            </Box>
          ) : (
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="userName"
                    required
                    fullWidth
                    id="userName"
                    label="Nome"
                    autoFocus
                    error={userNameError}
                    helperText={userNameError && helperText}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="userEmail"
                    label="Email"
                    name="userEmail"
                    autoComplete="email"
                    error={userEmailError}
                    helperText={userEmailError && helperText}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="userPassword"
                    label="Senha"
                    type="password"
                    id="userPassword"
                    autoComplete="new-password"
                    error={userPasswordError}
                    helperText={userPasswordError && helperText}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: theme.palette.primary.main, color: theme.palette.secondary.main }}
              >
                Realizar cadastro
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/signin" variant="body2">
                    Já tem uma conta? Entrar
                  </Link>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}