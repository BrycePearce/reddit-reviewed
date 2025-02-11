import React from 'react';
import useTheme from './hooks/useTheme';
import { ListPosts } from './components/ListPosts';
import { AuthenticationWrapper } from './components/Authentication/AuthenticationWrapper';

const Root = () => {
  const { cycleTheme } = useTheme();

  return (
    <AuthenticationWrapper>
      <main className="p-6">
        <div>
          <button onClick={cycleTheme}>Toggle Theme</button>
          <ListPosts />
        </div>
      </main>
    </AuthenticationWrapper>
  );
};

export default Root;
