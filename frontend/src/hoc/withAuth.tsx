"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const withAuth = (WrappedComponent: React.FC) => {
  const ProtectedComponent: React.FC = (props) => {
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/');
      }
    }, [router]);


    if (!user) {
      return null;
    }
    return <WrappedComponent {...props} />;
  };

  return ProtectedComponent;
};

export default withAuth;