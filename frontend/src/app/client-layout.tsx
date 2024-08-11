"use client";

import { ReactNode } from 'react';
import './globals.css';
import ThemeRegistry from '@/components/ThemeRegistry';
import { ErrorProvider } from '@/context/ErrorContext';
import { Provider } from 'react-redux';
import { AuthProvider } from '@/context/AuthContext';
import store from '@/store';

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <ErrorProvider>
      <Provider store={store}>
        <ThemeRegistry>
          <AuthProvider>
            <body>{children}</body>
          </AuthProvider>
        </ThemeRegistry>
      </Provider>
    </ErrorProvider>

  );
}