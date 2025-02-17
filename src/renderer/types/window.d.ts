import type { TokenResponse } from "src/types";

declare global {
  interface Window {
    electronAPI: {
      showContextMenu: () => void;
      onContextMenuCommand: (callback: (command: string) => void) => void;
      clearOauthListeners: () => void;
      onOauth: (callback: (token: TokenResponse) => void) => void;
    }
  }
}

export { }
