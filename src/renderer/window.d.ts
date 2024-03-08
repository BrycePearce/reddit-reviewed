declare global {
  interface Window {
    electronAPI: {
      onOauth: (callback: (token: string) => void) => void;
      clearOauthListeners: () => void;
    }
  }
}

export { }
