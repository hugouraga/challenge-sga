'use client';

import React from 'react';
import { Container, CssBaseline, Box, Avatar, Typography, ThemeProvider } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SignUpForm from '@/components/Auth/SignUpForm';
import { theme } from '@/theme/theme';

export default function SignUpPage() {
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
          <SignUpForm />
        </Box>
      </Container>
    </ThemeProvider>
  );
}