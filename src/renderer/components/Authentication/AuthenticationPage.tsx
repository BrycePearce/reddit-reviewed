import { useEffect, useState } from 'react';

import RedditAuthButton from './RedditOAuthBtn';
import snooLogin from '../../assets/images/snoo-login.png';
import { useAuthListener } from '../../hooks/useAuthListener';
import { loadOauthUrl } from '../../utils/utils';

export const AuthenticationPage = () => {
  const { isAuthenticating, setIsAuthenticating } = useAuthListener();
  const [authWindow, setAuthWindow] = useState<Window | null>(null);

  const onSignin = () => {
    setIsAuthenticating(true);
    const authUrl = loadOauthUrl();

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
  }, [authWindow, setIsAuthenticating]);

  return (
    <main
      className="flex items-center justify-center w-screen h-screen"
      data-theme="reddit"
    >
      <div className="flex flex-col items-center gap-6 p-12 group">
        <div className="box-border relative overflow-hidden rounded-full w-36 h-36 transition-all duration-300 hover:shadow-[0_0_25px_5px_rgba(255,69,0,0.4)] group-hover:shadow-[0_0_25px_5px_rgba(255,69,0,0.4)]">
          <div className="absolute inset-0 transition-opacity duration-300 rounded-full opacity-0 group-hover:opacity-100 bg-gradient-to-r from-reddit-orange/20 to-orange-500/20 blur-sm" />
          <img
            alt="Reddit Mascot Snoo"
            className="absolute w-full h-full transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            src={snooLogin}
          />
        </div>
        <RedditAuthButton
          className="w-96"
          isAuthenticating={isAuthenticating}
          onClick={onSignin}
        />
      </div>
    </main>
  );
};

export default AuthenticationPage;
