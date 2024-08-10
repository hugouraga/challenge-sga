import React from 'react';
import { Box, Grid, TextField, Button, Link, Typography, CircularProgress } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';
import { useSignUp } from '@/hooks/useSignUp';
import { theme } from '@/theme/theme';

export default function SignUpForm() {
  const {
    userNameError,
    userEmailError,
    userPasswordError,
    successMessage,
    isSubmitting,
    handleBlur,
    handleSubmit,
  } = useSignUp();

  return (
    <>
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
                error={!!userNameError}
                helperText={userNameError}
                onBlur={handleBlur}
                disabled={isSubmitting}
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
                error={!!userEmailError}
                helperText={userEmailError}
                onBlur={handleBlur}
                disabled={isSubmitting}
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
                error={!!userPasswordError}
                helperText={userPasswordError}
                onBlur={handleBlur}
                disabled={isSubmitting}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} /> : 'Realizar cadastro'}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/Login" variant="body2">
                Já tem uma conta? Entrar
              </Link>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
}