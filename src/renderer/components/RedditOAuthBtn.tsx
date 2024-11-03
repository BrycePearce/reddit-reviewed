import { useEffect, useState } from 'react';

import { CLIENT_ID, redditCallbackUrl } from '../clientConstants/constants';
import RedditIcon from '../icons/RedditIcon';
import React from 'react';

const RedditAuthButton = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authWindow, setAuthWindow] = useState<Window | null>(null);
  const [isHovered, setIsHovered] = useState(false);

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
    <button
      onClick={onSignin}
      disabled={isAuthenticating}
      className="h-full text-white btn btn-primary btn-block"
      data-theme="reddit"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="z-10">Sign in with</div>
      <RedditIcon
        className="h-6 -ml-2.5"
        backgroundClassName={`duration-250 ease-out ${isAuthenticating ? 'fill-redditDisabledHidden' : isHovered ? 'fill-redditSecondary' : 'fill-redditPrimary'}`}
      />
    </button>
  );
};

export default RedditAuthButton;
