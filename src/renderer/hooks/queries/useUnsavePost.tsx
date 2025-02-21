import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthFetch } from '../useAuthFetch';
import { queryKeys, redditUrls } from '../../clientConstants/constants';
import { useAuth } from '../../context/AuthContext';

type UnsavePostParams = {
  postId: string;
};

export const useUnsavePost = () => {
  const { unsavePost } = redditUrls;
  const { authenticatedFetch } = useAuthFetch();
  const queryClient = useQueryClient();
  const { authState } = useAuth();

  return useMutation({
    mutationFn: async ({ postId }: UnsavePostParams) => {
      const params = new URLSearchParams({
        id: postId,
      });

      return await authenticatedFetch(unsavePost, {
        method: 'POST',
        body: params,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.savedPosts(authState.access_token),
      });
    },
  });
};
