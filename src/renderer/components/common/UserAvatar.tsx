import { useState } from 'react';

import defaultAvatar from '../../assets/images/avatar_default.png';
import { useUserAvatar } from '../../hooks/queries/useUserAvatar';

type UserAvatarProps = {
  authorFullname: string;
  className?: string;
  size?: number;
  alt?: string;
};

const UserAvatar = ({
  authorFullname,
  className = '',
  alt = 'User avatar',
}: UserAvatarProps) => {
  const [imageError, setImageError] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { userInfo, isLoading, isError, error } = useUserAvatar(authorFullname);

  const handleError = () => {
    setImageError(true);
    console.error(`Failed to load avatar for user ${authorFullname}`);
  };

  const handleLoad = () => {
    setIsImageLoaded(true);
  };

  if (isError) {
    return (
      <figure aria-label={alt} className={`avatar m-0 ${className}`} role="img">
        <img
          alt=""
          className="w-full h-full transition-opacity duration-200 rounded-full ring ring-base-300"
          src={defaultAvatar}
        />
        {error instanceof Error && (
          <figcaption className="sr-only">{error.message}</figcaption>
        )}
      </figure>
    );
  }

  return (
    <figure aria-label={alt} className={`avatar m-0 ${className}`} role="img">
      {/* shimmer loader */}
      {(isLoading || !isImageLoaded) && (
        <div
          aria-busy="true"
          aria-label="Loading avatar"
          className="w-full h-full rounded-full skeleton"
          role="progressbar"
        />
      )}

      {userInfo?.profile_img && !imageError && (
        <img
          alt=""
          className={`rounded-full ring ring-base-200 transition-opacity duration-200 w-full h-full ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          src={decodeURIComponent(userInfo.profile_img.replace(/&amp;/g, '&'))}
          onError={handleError}
          onLoad={handleLoad}
        />
      )}
    </figure>
  );
};

export default UserAvatar;
