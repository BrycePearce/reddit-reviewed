import { createContext, useContext, useState, ReactNode } from 'react';

import { QueryClient } from '@tanstack/react-query';

import type { TokenResponse } from 'src/types';

type AuthContextType = {
  authState: TokenResponse;
  setAuthState: (authState: TokenResponse) => void;
  isAuthenticated: boolean;
  logout: () => void;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
  children,
  queryClient,
}: {
  children: ReactNode;
  queryClient: QueryClient;
}) => {
  const [authState, setAuthState] = useState<TokenResponse>();
  const logout = () => {
    setAuthState({
      access_token: null,
      expires_in: null,
      refresh_token: null,
      scope: null,
      token_type: null,
    });
    queryClient.clear();
  };
  const isAuthenticated = Boolean(authState?.access_token);

  return (
    <AuthContext.Provider
      value={{ authState, setAuthState, isAuthenticated, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
