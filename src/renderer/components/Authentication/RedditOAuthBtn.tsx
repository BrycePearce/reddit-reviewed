import React from 'react';
import RedditIcon from '../../icons/RedditIcon';

type RedditAuthButtonProps = {
  isAuthenticating: boolean;
  isHovered: boolean;
  onClick: () => void;
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
};

const RedditAuthButton = ({
  onClick,
  isAuthenticating,
  isHovered,
  setIsHovered,
}: RedditAuthButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={isAuthenticating}
      className="h-full text-white btn btn-primary btn-block"
      data-theme="reddit"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
    </button>
  );
};

export default RedditAuthButton;
