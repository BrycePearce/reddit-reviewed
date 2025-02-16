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
      <div className="avatar">
        <div className={className}>
          <img
            alt={alt}
            className="w-full h-full rounded-full not-prose"
            src={defaultAvatar}
          />
          {error instanceof Error && (
            <span className="sr-only">{error.message}</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`avatar ${className}`}>
      <div className={className}>
        {/* shimmer loader */}
        {(isLoading || !isImageLoaded) && (
          <div className="w-full h-full rounded-full skeleton" />
        )}

        {userInfo?.profile_img && !imageError && (
          <img
            alt={alt}
            className={`not-prose rounded-full transition-opacity duration-200 m-0 w-full h-full ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            src={decodeURIComponent(
              userInfo.profile_img.replace(/&amp;/g, '&')
            )}
            onError={handleError}
            onLoad={handleLoad}
          />
        )}
      </div>
    </div>
  );
};

export default UserAvatar;
