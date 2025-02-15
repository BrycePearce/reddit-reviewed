import { useEffect, useState } from 'react';

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    return savedTheme;
  }

  // load system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
};

const loadNewTheme = (prevTheme: string) => {
  switch (prevTheme) {
    case 'dark':
      return 'sunset';
    case 'sunset':
      return 'light';
    case 'light':
      return 'dark';
    default:
      return 'dark';
  }
};

const useTheme = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  // Apply the theme to the document element and save the user's choice
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Function to cycle through themes
  const cycleTheme = () => {
    setTheme((prevTheme) => loadNewTheme(prevTheme));
  };

  return { theme, cycleTheme };
};

export default useTheme;
