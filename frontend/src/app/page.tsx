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
import { theme } from '@/theme/theme';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function SignIn() {
  const router = useRouter();
  const { signIn } = useAuth();

  const [emailError, setEmailError] = React.useState<string | null>(null);
  const [passwordError, setPasswordError] = React.useState<string | null>(null);
  const [generalError, setGeneralError] = React.useState<string | null>(null);

  const validateEmail = (email: string) => {
    if (!email.includes('@')) {
      return 'Email deve conter "@"';
    }
    return null;
  };

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return 'Senha deve conter pelo menos 8 caracteres.';
    }
    return null;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get('email')) ?? '';
    const password = String(data.get('password')) ?? '';

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setEmailError(emailError);
      setPasswordError(passwordError);
      setGeneralError(null);
      return;
    }

    setEmailError(null);
    setPasswordError(null);

    try {
      await signIn(email, password);
      router.push('/Home');
    } catch (error: any) {
      setGeneralError('Erro ao realizar login. Verifique suas credenciais e tente novamente.');
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'email':
        setEmailError(validateEmail(value));
        break;
      case 'password':
        setPasswordError(validatePassword(value));
        break;
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
            Login - SGA
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {generalError && (
              <Typography color="error" variant="body2" align="center" sx={{ mb: 2 }}>
                {generalError}
              </Typography>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={!!emailError}
              helperText={emailError}
              onBlur={handleBlur}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!passwordError}
              helperText={passwordError}
              onBlur={handleBlur}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="primary"
            >
              Entrar
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/Cadastro" variant="body2">
                  {"Não tem conta? Cadastre-se"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}