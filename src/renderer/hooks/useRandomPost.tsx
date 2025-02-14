import { useState, useCallback, useEffect } from 'react';
import { useSavedPosts } from './queries/useSavedPosts';
import type { Post } from '../types/reddit/Common';

export const useRandomPost = () => {
  const { savedPosts, isLoading, isError } = useSavedPosts();
  const [currentPost, setCurrentPost] = useState<Post | null>(null);

  const randomizePost = useCallback(() => {
    if (!savedPosts?.pages) return;

    // load all pages into a single list
    const allPosts = savedPosts.pages.flatMap((page) => page.data.children);
    if (!allPosts.length) return;

    const randomIndex = Math.floor(Math.random() * allPosts.length);
    setCurrentPost(allPosts[randomIndex]);
  }, [savedPosts]);

  useEffect(() => {
    if (!isLoading && savedPosts?.pages) {
      randomizePost();
    }
  }, [isLoading, savedPosts, randomizePost]);

  return {
    currentPost,
    randomizePost,
    isLoading: !isError && (isLoading || !currentPost), // Stop loading state if there's an error
    isError,
  };
};
