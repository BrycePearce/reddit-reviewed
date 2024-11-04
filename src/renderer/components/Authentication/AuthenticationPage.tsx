import React, { useEffect, useState } from 'react';
import RedditAuthButton from './RedditOAuthBtn';

import { useAuthListener } from '../../hooks/useAuthListener';
import { redditCallbackUrl, CLIENT_ID } from '../../clientConstants/constants';

export const AuthenticationPage = () => {
  const { isAuthenticating, setIsAuthenticating } = useAuthListener();
  const [authWindow, setAuthWindow] = useState<Window | null>(null);

  const onSignin = () => {
    setIsAuthenticating(true);
    const redirectUri = encodeURIComponent(redditCallbackUrl);
    const state = crypto.randomUUID();
    const scope = encodeURIComponent('identity history');
    const authUrl = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=code&state=${state}&redirect_uri=${redirectUri}&scope=${scope}&duration=permanent`;

    const newAuthWindow = window.open(authUrl, '_blank');
    setAuthWindow(newAuthWindow);
  };

  useEffect(() => {
    const checkWindow = setInterval(() => {
      if (!authWindow || authWindow.closed) {
        setIsAuthenticating(false);
        clearInterval(checkWindow);
      }
    }, 1000);

    return () => {
      clearInterval(checkWindow);
      if (authWindow && !authWindow.closed) {
        authWindow.close();
      }
    };
  }, [authWindow]);

  return (
    <RedditAuthButton onClick={onSignin} isAuthenticating={isAuthenticating} />
  );
};

export default AuthenticationPage;
