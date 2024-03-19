import { createContext, useContext, useState, ReactNode } from "react";

import type { TokenResponse } from "src/types";

type AuthContextType = {
  authState: TokenResponse;
  setAuthState: (authState: TokenResponse) => void;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<TokenResponse>({
    access_token: "",
    expires_in: "",
    refresh_token: "",
    scope: "",
    token_type: "",
  });

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth not within an AuthProvider");
  }

  return context;
};
