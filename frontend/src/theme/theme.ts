// theme.js
import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';
import { Colors } from './colors';

const roboto = Roboto({
  weight: ['400', '500', '700', '900'],
  subsets: ['vietnamese'],
  display: 'block',
});

export const theme = createTheme({
  palette: {
    primary: {
      main: Colors.primary,
    },
    secondary: {
      main: Colors.secondary,
    },
    info: {
      main: Colors.info,
    },
    warning: {
      main: Colors.warning,
    },
    error: {
      main: Colors.danger,
    },
    success: {
      main: Colors.lime_green,
    },
    background: {
      default: Colors.white,
      paper: Colors.light,
    },
    text: {
      primary: Colors.dark,
      secondary: Colors.muted,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});
