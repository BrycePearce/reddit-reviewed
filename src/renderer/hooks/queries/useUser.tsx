import { useQuery } from '@tanstack/react-query';

import { queryKeys, redditUrls } from '../../clientConstants/constants';
import { useAuth } from '../../context/AuthContext';
import { useAuthFetch } from '../useAuthFetch';
import type { LoggedInUser } from '../../types/reddit/LoggedInUser';

export const useUser = () => {
  const { authenticatedFetch } = useAuthFetch();
  const { isAuthenticated } = useAuth();
  const { me } = redditUrls;

  const {
    data: userInfo,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [queryKeys.userInfo],
    queryFn: () => authenticatedFetch<LoggedInUser>(me),
    refetchOnWindowFocus: false,
    enabled: !!isAuthenticated,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  return {
    userInfo,
    isLoading,
    isError,
    error,
  };
};
