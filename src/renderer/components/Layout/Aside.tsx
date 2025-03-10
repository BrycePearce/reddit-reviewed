import { usePostsContext } from '../../context/PostsContext';
import useTheme from '../../hooks/useTheme';

export const Aside = () => {
  const { cycleTheme } = useTheme();
  const { randomPost } = usePostsContext();
  const { randomizePost } = randomPost;

  return (
    <aside className="h-screen w-52 bg-base-200 shrink-0">
      <div className="h-full p-4">
        <ul className="menu">
          <li className="lg:hidden">
            <button className="text-xl">🏠</button>
          </li>
          <li className="lg:hidden">
            <button className="text-xl">⚙️</button>
          </li>

          <li className="hidden lg:block">
            <button onClick={randomizePost}>Randomize</button>
          </li>
          <li className="hidden lg:block">
            <button onClick={cycleTheme}>toggleTheme</button>
          </li>
        </ul>
      </div>
    </aside>
  );
};
