import useTheme from '../../hooks/useTheme';

const Navbar = () => {
  const { cycleTheme } = useTheme();
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="text-xl normal-case btn btn-ghost">Reddit Saved</a>
      </div>
      <div className="flex-none">
        <ul className="p-0 menu menu-horizontal">
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
          <li>
            <button onClick={cycleTheme}>Toggle Theme</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
