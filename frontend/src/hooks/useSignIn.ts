'use client'

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { validateEmail, validatePassword } from '@/utils/auth.validations';

interface UseSignInReturn {
  emailError: string | null;
  passwordError: string | null;
  generalError: string | null;
  isSubmitting: boolean;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export function useSignIn(): UseSignInReturn {
  const router = useRouter();
  const { signIn } = useAuth();

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleBlur = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'email':
        setEmailError(validateEmail(value));
        break;
      case 'password':
        setPasswordError(validatePassword(value));
        break;
    }
  }, []);

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const data = new FormData(event.currentTarget);
    const email = String(data.get('email')) ?? '';
    const password = String(data.get('password')) ?? '';

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setEmailError(emailError);
      setPasswordError(passwordError);
      setGeneralError(null);
      setIsSubmitting(false);
      return;
    }

    setEmailError(null);
    setPasswordError(null);

    try {
      await signIn(email, password);
      router.push('/');
    } catch (error: any) {
      setGeneralError('Erro ao realizar login. Verifique suas credenciais e tente novamente.');
      setIsSubmitting(false);
    }
  }, [signIn, router]);

  return {
    emailError,
    passwordError,
    generalError,
    isSubmitting,
    handleBlur,
    handleSubmit,
  };
}