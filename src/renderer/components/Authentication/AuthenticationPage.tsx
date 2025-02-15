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
  }, [authWindow]);

  return (
    <main
      className="flex items-center justify-center w-screen h-screen"
      data-theme="reddit"
    >
      <div className="flex flex-col items-center gap-6 p-12">
        <div className="box-border relative overflow-hidden rounded-full w-36 h-36">
          <img
            alt=""
            className="absolute w-full h-full transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            src={snooLogin}
          />
        </div>
        <RedditAuthButton
          className="w-72"
          isAuthenticating={isAuthenticating}
          onClick={onSignin}
        />
      </div>
    </main>
  );
};

export default AuthenticationPage;
