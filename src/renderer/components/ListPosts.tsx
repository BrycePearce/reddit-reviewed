import React from 'react';
import { useSavedPosts } from '../hooks/queries/useSavedPosts';

export const ListPosts = () => {
  const { savedPosts, isLoading } = useSavedPosts();

  if (isLoading)
    return (
      <div>
        <div className="flex flex-col gap-4 w-52">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full skeleton shrink-0"></div>
            <div className="flex flex-col gap-4">
              <div className="w-20 h-4 skeleton"></div>
              <div className="h-4 skeleton w-28"></div>
            </div>
          </div>
          <div className="w-full h-32 skeleton"></div>
        </div>
      </div>
    );

  return (
    <div>
      <div className="grid w-32 h-20 rounded bg-primary text-primary-content place-content-center">
        1
      </div>
      <div className="grid w-32 h-20 rounded bg-accent text-accent-content place-content-center">
        2
      </div>
      <div className="grid w-32 h-20 rounded bg-secondary text-secondary-content place-content-center">
        3
      </div>
    </div>
  );
};
