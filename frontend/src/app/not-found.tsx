'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Custom404: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/');
    }, 2000);
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <h1>404 - Página não encontrada</h1>
      <p>Você será redirecionado para a página inicial em instantes...</p>
    </div>
  );
};

export default Custom404;