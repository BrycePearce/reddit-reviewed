import { useCallback, useEffect, useState } from 'react';

import { useSavedPosts } from './queries/useSavedPosts';

import type { Post } from '../types/reddit/Common';

// todo make the post look like an actual reddit comment, maybe even include the parent comment if it has one
// also todo, load useRandomPost at a higher level so it actually works. Calling it twice creates two separate instances and they don't chat with each other. Or use a context or smh
export const useRandomPost = () => {
  const { savedPosts, isLoading, isError } = useSavedPosts();
  const [currentPost, setCurrentPost] = useState<Post | null>(null);

  const randomizePost = useCallback(() => {
    const hasPosts = savedPosts?.pages?.[0].data?.children.length > 0;
    if (!hasPosts) return;

    const allPosts = savedPosts.pages.flatMap((page) => page.data.children);
    const randomIndex = Math.floor(Math.random() * allPosts.length);
    const newPost = allPosts[randomIndex];

    setCurrentPost({ ...newPost });
  }, [savedPosts]);

  // seed random post when saved posts are loaded
  useEffect(() => {
    if (savedPosts?.pages && !isLoading) {
      const allPosts = savedPosts.pages.flatMap((page) => page.data.children);

      // Clear current post if no posts left
      if (allPosts.length === 0) {
        setCurrentPost(null);
        return;
      }

      // Run randomizePost if we have posts but no current post (for cases where user clears all saved, then tabs back in after saving more posts)
      if (allPosts.length > 0 && !currentPost) {
        randomizePost();
      }
    }
  }, [currentPost, savedPosts?.pages, isLoading, randomizePost]);

  return {
    currentPost,
    randomizePost,
    isLoading:
      !isError &&
      (isLoading || (!currentPost && savedPosts?.pages === undefined)),
    isError,
  };
};
