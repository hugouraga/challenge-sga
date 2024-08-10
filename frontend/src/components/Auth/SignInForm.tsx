import React from 'react';
import { Button, TextField, Grid, Link, CircularProgress, Typography, Box } from '@mui/material';
import { useSignIn } from '@/hooks/useSignIn';

export default function SignInForm() {
  const {
    emailError,
    passwordError,
    generalError,
    isSubmitting,
    handleBlur,
    handleSubmit,
  } = useSignIn();

  const hasErrors = !!emailError || !!passwordError || !!generalError;

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      {generalError && (
        <Typography color="error" variant="body2" align="center" sx={{ mb: 2 }} aria-live="polite">
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
        disabled={isSubmitting}
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
        disabled={isSubmitting}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        color="primary"
        disabled={isSubmitting || hasErrors}
      >
        {isSubmitting ? <CircularProgress size={24} /> : 'Entrar'}
      </Button>
      <Grid container>
        <Grid item>
          <Link href="/Cadastro" variant="body2">
            {"Não tem conta? Cadastre-se"}
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}