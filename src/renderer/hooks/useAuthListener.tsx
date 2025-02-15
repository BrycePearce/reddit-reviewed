import { useState, useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '../clientConstants/constants';
import { useAuth } from '../context/AuthContext';

import type { TokenResponse } from 'src/types';

// handles oAuth authentication events and loads them into useAuth context
export const useAuthListener = () => {
  const queryClient = useQueryClient();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { setAuthState } = useAuth();

  useEffect(() => {
    const handleOauth = (token: TokenResponse) => {
      setAuthState(token);

      queryClient.resetQueries({ queryKey: queryKeys.userInfo });
    };

    window.electronAPI.onOauth(handleOauth);

    // Cleanup the listener when the component unmounts
    return () => window.electronAPI.clearOauthListeners();
  }, [setAuthState, queryClient]);

  return { isAuthenticating, setIsAuthenticating };
};
