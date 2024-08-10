"use client";

import * as React from 'react';
import { Container, CssBaseline, Box, Typography, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/theme/theme';
import SignInForm from '@/components/Auth/SignInForm';

export default function LoginPage() {
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
          <SignInForm />
        </Box>
      </Container>
    </ThemeProvider>
  );
}