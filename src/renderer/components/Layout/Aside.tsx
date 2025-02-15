import { useRandomPost } from '../../hooks/useRandomPost';
import useTheme from '../../hooks/useTheme';

const Aside = () => {
  const { cycleTheme } = useTheme();
  const { randomizePost } = useRandomPost();

  return (
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
  );
};

export default Aside;
