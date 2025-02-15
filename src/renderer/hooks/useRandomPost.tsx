import { useCallback, useEffect, useState } from 'react';

import { useSavedPosts } from './queries/useSavedPosts';

import type { Post } from '../types/reddit/Common';

export const useRandomPost = () => {
  const { savedPosts, isLoading, isError } = useSavedPosts();
  const [currentPost, setCurrentPost] = useState<Post | null>(null);

  const randomizePost = useCallback(() => {
    if (!savedPosts?.pages) return;
    const allPosts = savedPosts.pages.flatMap((page) => page.data.children);
    if (!allPosts.length) return;
    const randomIndex = Math.floor(Math.random() * allPosts.length);
    setCurrentPost(allPosts[randomIndex]);
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
