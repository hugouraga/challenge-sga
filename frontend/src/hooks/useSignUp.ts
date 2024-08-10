'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useError } from '@/context/ErrorContext';
import { validateEmail, validatePassword } from '@/utils/auth.validations';

export function useSignUp() {
  const router = useRouter();
  const { setError } = useError();

  const [userNameError, setUserNameError] = useState<string | null>(null);
  const [userEmailError, setUserEmailError] = useState<string | null>(null);
  const [userPasswordError, setUserPasswordError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateUserName = (name: string) => {
    if (name.trim().split(' ').length < 2) {
      return 'Nome deve incluir nome e sobrenome.';
    }
    return null;
  };

  const handleBlur = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'userName':
        setUserNameError(validateUserName(value));
        break;
      case 'userEmail':
        setUserEmailError(validateEmail(value));
        break;
      case 'userPassword':
        setUserPasswordError(validatePassword(value));
        break;
    }
  }, []);

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const data = new FormData(event.currentTarget);
    const userName = data.get('userName') as string;
    const userEmail = data.get('userEmail') as string;
    const userPassword = data.get('userPassword') as string;

    const userNameError = validateUserName(userName);
    const userEmailError = validateEmail(userEmail);
    const userPasswordError = validatePassword(userPassword);

    if (userNameError || userEmailError || userPasswordError) {
      setUserNameError(userNameError);
      setUserEmailError(userEmailError);
      setUserPasswordError(userPasswordError);
      setIsSubmitting(false);
      return;
    }

    setUserNameError(null);
    setUserEmailError(null);
    setUserPasswordError(null);

    const signupObject = JSON.stringify({ userName, userEmail, userPassword });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333'}/user/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: signupObject,
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falha ao registrar usuário');
      }

      setSuccessMessage('Usuário criado com sucesso! Redirecionando...');
      setTimeout(() => {
        router.push('/Login');
      }, 2000);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }, [router, setError]);

  return {
    userNameError,
    userEmailError,
    userPasswordError,
    successMessage,
    isSubmitting,
    handleBlur,
    handleSubmit,
  };
}