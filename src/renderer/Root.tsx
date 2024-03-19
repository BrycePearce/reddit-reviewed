import RedditAuthButton from "./components/RedditOAuthBtn";
import { useAuthentication } from "./hooks/useAuthentication";
import useTheme from "./hooks/useTheme";

const Root = () => {
  const { toggleTheme } = useTheme();

  useAuthentication();

  return (
    <>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <RedditAuthButton />
    </>
  );
};

export default Root;
