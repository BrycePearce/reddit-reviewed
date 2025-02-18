import type { TokenResponse } from "src/types";

declare global {
  interface Window {
    electronAPI: {
      clearOauthListeners: () => void;
      deleteStoredAuth: () => Promise<void>;
      getStoredAuth: () => Promise<TokenResponse | undefined>;
      onContextMenuCommand: (callback: (command: string) => void) => void;
      onOauth: (callback: (token: TokenResponse) => void) => void;
      showContextMenu: () => void;
    }
  }
}

export { }
