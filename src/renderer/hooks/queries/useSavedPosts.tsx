import { useInfiniteQuery } from '@tanstack/react-query';
import { queryKeys } from '../../clientConstants/constants';
import { useAuth } from '../../context/AuthContext';
import { useAuthFetch } from '../useAuthFetch';
import { useUser } from './useUser';
import { RedditPostResponse } from '../../types/reddit/Common';

interface SavedPostsParams {
  limit?: number;
  type?: 'links' | 'comments';
}

// todo: add types
export const useSavedPosts = ({ limit = 100, type }: SavedPostsParams = {}) => {
  const { authenticatedFetch } = useAuthFetch();
  const { authState } = useAuth();
  const { userInfo } = useUser();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    ...rest
  } = useInfiniteQuery({
    initialPageParam: undefined,
    queryKey: queryKeys.savedPosts(authState?.access_token),
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams({
        limit: String(limit),
        ...(pageParam && { after: pageParam }),
        ...(type && { type }),
        raw_json: '1',
      });

      return await authenticatedFetch<RedditPostResponse>(
        `https://oauth.reddit.com/user/${(userInfo as any).name}/saved?${params}`
      );
    },
    getNextPageParam: (lastPage: RedditPostResponse) =>
      lastPage.data.after || undefined,
    enabled: !!authState?.access_token && !!userInfo,
  });

  return {
    savedPosts: data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    ...rest,
  };
};
