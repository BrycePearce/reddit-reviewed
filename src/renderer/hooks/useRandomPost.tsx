import { useCallback, useEffect, useState } from 'react';

import { useSavedPosts } from './queries/useSavedPosts';

import type { Post } from '../types/reddit/Common';

// todo make the post look like an actual reddit comment, maybe even include the parent comment if it has one
// also todo, load useRandomPost at a higher level so it actually works. Calling it twice creates two separate instances and they don't chat with each other. Or use a context or smh
export const useRandomPost = () => {
  const { savedPosts, isLoading, isError } = useSavedPosts();
  const [currentPost, setCurrentPost] = useState<Post | null>(null);

  const randomizePost = useCallback(() => {
    if (!savedPosts?.pages) return;
    const allPosts = savedPosts.pages.flatMap((page) => page.data.children);
    if (!allPosts.length) return;

    const randomIndex = Math.floor(Math.random() * allPosts.length);
    const newPost = allPosts[randomIndex];
    setCurrentPost({ ...newPost });
  }, [savedPosts]);

  // seed random post when saved posts are loaded
  useEffect(() => {
    if (!currentPost && savedPosts?.pages && !isLoading) {
      randomizePost();
    }
  }, [currentPost, savedPosts?.pages, isLoading, randomizePost]);

  return {
    currentPost,
    randomizePost,
    isLoading: !isError && (isLoading || !currentPost),
    isError,
  };
};
