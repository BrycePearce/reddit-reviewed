import { AuthenticationWrapper } from './components/Authentication/AuthenticationWrapper';
import { ListPosts } from './components/ListPosts';
import useTheme from './hooks/useTheme';

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
