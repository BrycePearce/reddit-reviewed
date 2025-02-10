import React from 'react';
import { useAuth } from './context/AuthContext';
import useTheme from './hooks/useTheme';
import AuthenticationPage from './components/Authentication/AuthenticationPage';

const Root = () => {
  const { cycleTheme } = useTheme();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <main className="flex items-center justify-center w-screen h-screen">
        <AuthenticationPage />
      </main>
    );
  }

  return (
    <main className="p-6">
      <div>
        <button onClick={cycleTheme}>Toggle Theme</button>
        <div className="box-border relative overflow-hidden rounded-full w-36 h-36">
          <img
            className="absolute w-full h-full transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            src="https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Scooby-Doo.png/150px-Scooby-Doo.png"
          />
        </div>
      </div>
    </main>
  );
};

export default Root;
