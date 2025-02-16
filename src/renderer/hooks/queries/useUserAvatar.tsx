import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../../clientConstants/constants';
import { useAuthFetch } from '../useAuthFetch';

import type { UserData } from '../../types/reddit/UserData';

export const useUserAvatar = (userId: string) => {
  const { authenticatedFetch } = useAuthFetch();

  const {
    data: userInfo,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: queryKeys.userAvatar(userId),
    queryFn: async () => {
      const response = await authenticatedFetch<UserData>(
        `https://oauth.reddit.com/api/user_data_by_account_ids?ids=${userId}`
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
