import React, { useEffect, useState } from 'react';
import RedditAuthButton from './RedditOAuthBtn';

import { useAuthListener } from '../../hooks/useAuthListener';
import { redditCallbackUrl, CLIENT_ID } from '../../clientConstants/constants';
import snooLogin from '../../assets/images/snoo-login.png';

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
    <main className="flex flex-col items-center justify-center w-full gap-6">
      <div className="box-border relative overflow-hidden rounded-full w-36 h-36">
        <img
          className="absolute w-full h-full transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          src={snooLogin}
          alt="Reddit Snoo Login"
        />
      </div>
      <RedditAuthButton
        className="w-72"
        onClick={onSignin}
        isAuthenticating={isAuthenticating}
      />
    </main>
  );
};

export default AuthenticationPage;
