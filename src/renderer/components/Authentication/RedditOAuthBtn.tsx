import React, { useState } from 'react';
import RedditIcon from '../../icons/RedditIcon';

type RedditAuthButtonProps = {
  className?: string;
  isAuthenticating: boolean;
  onClick: () => void;
};

const RedditAuthButton = ({
  className = '',
  onClick,
  isAuthenticating,
}: RedditAuthButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={isAuthenticating}
      className={`text-white btn btn-primary ${className}`}
      data-theme="reddit"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isAuthenticating ? (
        <div className="text-white/80 loading loading-infinity loading-lg" />
      ) : (
        <>
          <div className="z-10">Sign in with</div>
          <RedditIcon
            className="h-6 -ml-2.5"
            backgroundClassName={`duration-250 ease-out ${
              isAuthenticating
                ? 'fill-redditDisabledHidden'
                : isHovered
                  ? 'fill-redditSecondary'
                  : 'fill-redditPrimary'
            }`}
          />
        </>
      )}
    </button>
  );
};

export default RedditAuthButton;
