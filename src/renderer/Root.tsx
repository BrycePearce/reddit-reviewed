import RedditAuthButton from "./components/RedditOAuthBtn";
import useTheme from "./hooks/useTheme";

const Root = () => {
  const { toggleTheme } = useTheme();

  return (
    <div>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <RedditAuthButton />
    </div>
  );
};

export default Root;
