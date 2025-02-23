import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from '@tanstack/react-query';
import { useAuthFetch } from '../useAuthFetch';
import { queryKeys, redditUrls } from '../../clientConstants/constants';
import { useAuth } from '../../context/AuthContext';
import type { RedditPostResponse } from '../../types/reddit/Common';

type UnsavePostParams = {
  postName: string;
};

export const useUnsavePost = () => {
  const { unsavePost } = redditUrls;
  const { authenticatedFetch } = useAuthFetch();
  const queryClient = useQueryClient();
  const { authState } = useAuth();

  return useMutation({
    mutationFn: async ({ postName }: UnsavePostParams) => {
      const params = new URLSearchParams({ id: postName });

      return await authenticatedFetch(unsavePost, {
        method: 'POST',
        body: params,
      });
    },
    onSuccess: (_, { postName }) => {
      queryClient.setQueryData(
        queryKeys.savedPosts(authState.access_token),
        (oldData: InfiniteData<RedditPostResponse>) => {
          if (!oldData) return oldData;

          // Create a new cache structure with the post removed
          const newPages = oldData.pages
            .map((page) => ({
              ...page,
              data: {
                ...page.data,
                children: page.data.children.filter(
                  (post) => post.data.name !== postName
                ),
              },
            }))
            .filter((page) => page.data.children.length > 0); // Remove empty pages

          return { ...oldData, pages: newPages };
        }
      );
    },
  });
};
