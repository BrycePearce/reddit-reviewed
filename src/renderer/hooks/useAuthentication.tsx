import { useEffect } from "react";

import { useAuth } from "../context/AuthContext";

import type { TokenResponse } from "src/types";

export const useAuthentication = () => {
  const { setAuthState } = useAuth();

  useEffect(() => {
    const handleOauth = (token: TokenResponse) => {
      setAuthState(token);
    };

    window.electronAPI.onOauth(handleOauth);

    // Cleanup the listener when the component unmounts
    return () => {
      window.electronAPI.clearOauthListeners();
    };
  }, [setAuthState]);
};
