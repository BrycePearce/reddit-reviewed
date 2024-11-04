import React, { useState } from 'react';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

import type { TokenResponse } from 'src/types';

// handles oAuth authentication events and loads them into useAuth context
export const useAuthListener = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { setAuthState } = useAuth();

  useEffect(() => {
    const handleOauth = (token: TokenResponse) => {
      setAuthState(token);
    };

    window.electronAPI.onOauth(handleOauth);

    // Cleanup the listener when the component unmounts
    return () => {
      window.electronAPI.clearOauthListeners();
    };
  }, [setAuthState]);

  return { isAuthenticating, setIsAuthenticating };
};
