"use client";

import { ReactNode } from 'react';
import './globals.css';
import ThemeRegistry from '@/components/ThemeRegistry';
import { ErrorProvider } from '@/context/ErrorContext';
import { store } from '@/store';
import { Provider } from 'react-redux';
import { AuthProvider } from '@/context/AuthContext';

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <Provider store={store}>
      <ErrorProvider>
        <ThemeRegistry>
          <AuthProvider>
            <body>{children}</body>
          </AuthProvider>
        </ThemeRegistry>
      </ErrorProvider>
    </Provider>
  );
}