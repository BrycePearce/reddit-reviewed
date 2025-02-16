import { useEffect, useState } from 'react';

const themes = [
  'light',
  'dark',
  'cupcake',
  'retro',
  'sunset',
  'reddit',
  'dracula',
  'dim',
  'lofi',
  'abyss',
  'nord',
];

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme && themes.includes(savedTheme)) {
    return savedTheme;
  }
  // load system preference (defaulting to 'light')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
};

const loadNewTheme = (prevTheme: string) => {
  const currentIndex = themes.indexOf(prevTheme);
  if (currentIndex === -1) {
    return themes[0];
  }
  const nextIndex = (currentIndex + 1) % themes.length;
  return themes[nextIndex];
};

const useTheme = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const cycleTheme = () => {
    setTheme((prevTheme) => loadNewTheme(prevTheme));
  };

  return { theme, cycleTheme };
};

export default useTheme;
