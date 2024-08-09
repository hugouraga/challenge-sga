import React, { createContext, useContext, useState, useEffect, ReactNode, use } from 'react';

interface AuthContextData {
  user: any;
  signIn(email: string, password: string): Promise<void>;
  signOut(): void;
  logout(): void;
  isAuthenticated(): boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      if (decodedToken.exp * 1000 < Date.now()) {
        signOut();
      } else {
        setUser({ email: decodedToken.email });
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333'}/user/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail: email, userPassword: password }),
      });
      const data = await response.json();
      const { token, user } = data;

      if (!token || !user) throw new Error('Credenciais inválidas');
      localStorage.setItem('token', token.access_token);
      setUser(user);


    } catch (error: any) {
      throw new Error(error)
    }

  };

  const signOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };


  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return decodedToken.exp * 1000 > Date.now();
  };

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}