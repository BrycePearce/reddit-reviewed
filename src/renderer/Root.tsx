import RedditAuthButton from './components/RedditOAuthBtn';
import { useAuthentication } from './hooks/useAuthentication';
import useTheme from './hooks/useTheme';

const Root = () => {
  const { cycleTheme } = useTheme();

  useAuthentication();

  return (
    <div className="p-6">
      <button onClick={cycleTheme}>Toggle Theme</button>
      <RedditAuthButton />
    </div>
  );
};

export default Root;
