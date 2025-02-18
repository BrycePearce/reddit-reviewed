import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

import { QueryClient } from '@tanstack/react-query';

import type { TokenResponse } from 'src/types';

type AuthContextType = {
  authState: TokenResponse;
  isAuthInitializing: boolean;
  isAuthenticated: boolean;
  logout: () => void;
  setAuthState: (authState: TokenResponse) => void;
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
  const [isAuthInitializing, setIsAuthInitializing] = useState(true);

  // check if we have a stored auth token on load
  useEffect(() => {
    const checkStoredAuth = async () => {
      const storedAuth = await window.electronAPI.getStoredAuth();
      if (storedAuth) {
        setAuthState(storedAuth);
      }
      setIsAuthInitializing(false);
    };
    checkStoredAuth();
  }, []);

  const logout = () => {
    setAuthState({
      access_token: null,
      expires_in: null,
      refresh_token: null,
      scope: null,
      token_type: null,
    });
    // clear stored tokens too
    window.electronAPI.deleteStoredAuth();
    queryClient.clear();
  };
  const isAuthenticated = Boolean(authState?.access_token);

  return (
    <AuthContext.Provider
      value={{
        authState,
        isAuthInitializing,
        isAuthenticated,
        logout,
        setAuthState,
      }}
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
