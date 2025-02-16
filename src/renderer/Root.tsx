import { AuthenticationWrapper } from './components/Authentication/AuthenticationWrapper';
import { Aside } from './components/Layout/Aside';
import { Navbar } from './components/Layout/Navbar';
import { SwipeView } from './components/views/SwipeView/SwipeView';
import { PostsProvider } from './context/PostsContext';

const Root = () => {
  return (
    <AuthenticationWrapper>
      <PostsProvider>
        <div className="flex h-screen">
          <aside className="h-screen w-52 bg-base-200 shrink-0">
            <Aside />
          </aside>
          <div className="flex flex-col flex-1">
            <Navbar />

            <main className="flex items-center justify-center flex-1 p-6">
              <SwipeView />
            </main>
          </div>
        </div>
      </PostsProvider>
    </AuthenticationWrapper>
  );
};
export default Root;
