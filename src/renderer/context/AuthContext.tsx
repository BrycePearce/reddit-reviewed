import React, { createContext, useContext, useState, ReactNode } from 'react';

import type { TokenResponse } from 'src/types';

type AuthContextType = {
  authState: TokenResponse;
  setAuthState: (authState: TokenResponse) => void;
  isAuthenticated: Boolean;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<TokenResponse>();
  const isAuthenticated = Boolean(authState?.access_token);

  return (
    <AuthContext.Provider value={{ authState, setAuthState, isAuthenticated }}>
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
