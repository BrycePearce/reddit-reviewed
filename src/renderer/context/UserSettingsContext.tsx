import { createContext, useContext, useMemo, useState } from 'react';

const UserSettingsContext = createContext<{
  isSwipeMode: boolean;
  setIsSwipeMode: (isSwipeMode: boolean) => void;
}>(null);

export const UserSettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isSwipeMode, setIsSwipeMode] = useState(true);
  const userContextValues = useMemo(
    () => ({
      isSwipeMode,
      setIsSwipeMode,
    }),
    [isSwipeMode, setIsSwipeMode]
  );

  return (
    <UserSettingsContext.Provider value={userContextValues}>
      {children}
    </UserSettingsContext.Provider>
  );
};

export const useSettingsContext = () => {
  const context = useContext(UserSettingsContext);
  if (!context) {
    throw new Error(
      'useSettingsContext must be used within a UserSettingsProvider'
    );
  }
  return context;
};
