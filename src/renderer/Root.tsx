import React from 'react';
import { useAuth } from './context/AuthContext';
import useTheme from './hooks/useTheme';
import AuthenticationPage from './components/Authentication/AuthenticationPage';

const Root = () => {
  const { cycleTheme } = useTheme();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated)
    return (
      <div className="p-6">
        <AuthenticationPage />
      </div>
    );

  return (
    <div className="p-6">
      <div>
        meow meow hello!
        <button onClick={cycleTheme}>Toggle Theme</button>
        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Scooby-Doo.png/150px-Scooby-Doo.png" />
      </div>
    </div>
  );
};

export default Root;
