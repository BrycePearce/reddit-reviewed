import { useRef } from 'react';
import { AuthenticationWrapper } from './components/Authentication/AuthenticationWrapper';
import { Aside } from './components/Layout/Aside';
import { Navbar } from './components/Layout/Navbar';
import { SwipeView } from './components/views/SwipeView/SwipeView';
import { PostsProvider } from './context/PostsContext';
import { UserSettingsProvider } from './context/UserSettingsContext';

const Root = () => {
  const swipeViewContainerRef = useRef<HTMLDivElement>(null);
  return (
    <AuthenticationWrapper>
      <UserSettingsProvider>
        <PostsProvider>
          <div className="flex h-screen">
            <aside className="h-screen w-52 bg-base-200 shrink-0">
              <Aside />
            </aside>
            <div className="flex flex-col flex-1">
              <Navbar />
              <main
                className="flex items-center justify-center flex-1 p-6 overflow-hidden"
                ref={swipeViewContainerRef}
              >
                <SwipeView swipeViewContainerRef={swipeViewContainerRef} />
              </main>
            </div>
          </div>
        </PostsProvider>
      </UserSettingsProvider>
    </AuthenticationWrapper>
  );
};
export default Root;
