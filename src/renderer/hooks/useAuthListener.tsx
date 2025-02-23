import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../clientConstants/constants';
import { useAuth } from '../context/AuthContext';
import type { TokenResponse } from 'src/types';
import { loadOauthUrl } from '../utils/utils';

// handles oAuth authentication events and loads them into useAuth context
export const useAuthListener = () => {
  const queryClient = useQueryClient();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authErrorMsg, setAuthErrorMsg] = useState('');
  const { setAuthState } = useAuth();
  const [authWindow, setAuthWindow] = useState<Window | null>(null);

  const onSignin = () => {
    setIsAuthenticating(true);
    const authUrl = loadOauthUrl();

    const newAuthWindow = window.open(authUrl, '_blank');
    setAuthWindow(newAuthWindow);
  };

  useEffect(() => {
    const handleOauth = (token: TokenResponse) => {
      setAuthState(token);
      queryClient.resetQueries({ queryKey: queryKeys.userInfo });
      setIsAuthenticating(false);
      if (authWindow && !authWindow.closed) {
        authWindow.close();
      }
      setAuthWindow(null);
    };

    const handleOauthError = ({
      error,
      description,
    }: {
      error: string;
      description: String;
    }) => {
      setIsAuthenticating(false);
      setAuthErrorMsg(`${error} ${description}`);
      if (authWindow && !authWindow.closed) {
        authWindow.close();
      }
      setAuthWindow(null);
    };

    window.electronAPI.onOauth(handleOauth);
    window.electronAPI.onOauthError(handleOauthError);

    // Check if window is closed manually
    const checkWindow = setInterval(() => {
      if (authWindow?.closed) {
        setIsAuthenticating(false);
        setAuthWindow(null);
        clearInterval(checkWindow);
      }
    }, 1000);

    return () => {
      window.electronAPI.clearOauthListeners();
      clearInterval(checkWindow);
      if (authWindow && !authWindow.closed) {
        authWindow.close();
      }
    };
  }, [authWindow, setAuthState, queryClient]);

  return { authErrorMsg, isAuthenticating, onSignin };
};
