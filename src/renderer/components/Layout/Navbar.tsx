import { useAuth } from '../../context/AuthContext';
import { useSettingsContext } from '../../context/UserSettingsContext';
import useTheme from '../../hooks/useTheme';

export const Navbar = () => {
  const { cycleTheme } = useTheme();
  const { isSwipeMode, setIsSwipeMode } = useSettingsContext();
  const { logout } = useAuth();

  return (
    <nav className="navbar bg-base-100">
      <div className="flex-1">
        <a className="text-xl normal-case btn btn-ghost">Reddit Saved</a>
      </div>
      <div className="flex-none">
        <ul className="items-center gap-4 menu menu-horizontal">
          <li>
            <button className="text-base btn" onClick={() => logout()}>
              Logout
            </button>
          </li>
          <li>
            <div className="form-control">
              <label
                htmlFor="swipe-mode-toggle"
                className={`gap-2 label ${isSwipeMode ? 'cursor-pointer' : ''}`}
              >
                <span className="text-base font-bold text-base-content">
                  Swipe Mode
                </span>
                <input
                  aria-label="Toggle swipe mode"
                  className="toggle toggle-secondary"
                  defaultChecked={isSwipeMode}
                  id="swipe-mode-toggle"
                  onChange={(e) => setIsSwipeMode(e.target.checked)}
                  type="checkbox"
                />
              </label>
            </div>
          </li>
          <li>
            <button className="text-base btn btn-ghost" onClick={cycleTheme}>
              Toggle Theme
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
