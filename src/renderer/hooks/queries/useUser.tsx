import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import { useAuthFetch } from '../useAuthFetch';
import { queryKeys } from '../../clientConstants/constants';

export const useUser = () => {
  const { authenticatedFetch } = useAuthFetch();
  const { isAuthenticated } = useAuth();

  const {
    data: userInfo,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [queryKeys.userInfo],
    queryFn: () => authenticatedFetch('https://oauth.reddit.com/api/v1/me'),
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
