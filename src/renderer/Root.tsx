import { AuthenticationWrapper } from './components/Authentication/AuthenticationWrapper';
import { Aside } from './components/Layout/Aside';
import { Navbar } from './components/Layout/Navbar';
import { SwipeView } from './components/views/SwipeView/SwipeView';
import { PostsProvider } from './context/PostsContext';
import { UserSettingsProvider } from './context/UserSettingsContext';

const Root = () => {
  return (
    <AuthenticationWrapper>
      <UserSettingsProvider>
        <PostsProvider>
          <div className="flex h-screen">
            <Aside />
            <div className="flex flex-col flex-1 overflow-y-auto">
              <Navbar />
              <SwipeView />
            </div>
          </div>
        </PostsProvider>
      </UserSettingsProvider>
    </AuthenticationWrapper>
  );
};
export default Root;
