import { useQuery } from '@tanstack/react-query';

import { queryKeys, redditUrls } from '../../clientConstants/constants';
import { useAuthFetch } from '../useAuthFetch';

import type { UserData } from '../../types/reddit/UserData';

export const useUserAvatar = (userId: string) => {
  const { authenticatedFetch } = useAuthFetch();
  const { userDataByAccountIds } = redditUrls;

  const {
    data: userInfo,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: queryKeys.userAvatar(userId),
    queryFn: async () => {
      const response = await authenticatedFetch<UserData>(
        userDataByAccountIds(userId)
      );
      return response[userId];
    },
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 20 * 60 * 1000,
  });

  return {
    userInfo,
    isLoading,
    isError,
    error,
  };
};
