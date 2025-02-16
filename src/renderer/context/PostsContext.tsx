import React, { createContext, useContext, useMemo } from 'react';

import { useSavedPosts } from '../hooks/queries/useSavedPosts';
import { useRandomPost } from '../hooks/useRandomPost';

const PostsContext = createContext<{
  randomPost: ReturnType<typeof useRandomPost>;
  savedPosts: ReturnType<typeof useSavedPosts>;
} | null>(null);

export const PostsProvider = ({ children }: { children: React.ReactNode }) => {
  const randomPost = useRandomPost();
  const savedPosts = useSavedPosts();

  const value = useMemo(
    () => ({
      randomPost,
      savedPosts,
    }),
    [randomPost, savedPosts]
  );

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};

export const usePostsContext = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePostsContext must be used within a PostsProvider');
  }
  return context;
};
