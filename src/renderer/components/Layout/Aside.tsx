import useTheme from '../../hooks/useTheme';

const Aside = () => {
  const { cycleTheme } = useTheme();
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
          <button>Home</button>
        </li>
        <li className="hidden lg:block">
          <button onClick={cycleTheme}>toggleTheme</button>
        </li>
      </ul>
    </div>
  );
};

export default Aside;
