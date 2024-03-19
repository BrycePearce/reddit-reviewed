import type { TokenResponse } from "src/types";

declare global {
  interface Window {
    electronAPI: {
      onOauth: (callback: (token: TokenResponse) => void) => void;
      clearOauthListeners: () => void;
    }
  }
}

export { }
