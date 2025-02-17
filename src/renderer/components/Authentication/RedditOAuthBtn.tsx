import { useState } from 'react';

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
      className={`text-white btn btn-lg btn-primary ${className}`}
      disabled={isAuthenticating}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isAuthenticating ? (
        <div className="text-white/80 loading loading-infinity loading-lg" />
      ) : (
        <>
          <div className="z-10">Sign in with</div>
          <RedditIcon
            backgroundClassName={`duration-250 ease-out ${
              isAuthenticating
                ? 'fill-base-200/0'
                : isHovered
                  ? 'fill-secondary'
                  : 'fill-primary'
            }`}
            className="h-8 -ml-2.5 mb-0.5"
            redditTextClassName="fill-white"
          />
        </>
      )}
    </button>
  );
};

export default RedditAuthButton;
