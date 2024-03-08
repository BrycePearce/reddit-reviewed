// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  onOauth(callback: (token: string) => void) {
    ipcRenderer.on('oauth', (_event, token: string) => {
      callback(token)
    })
  },
  // Add a method to remove all listeners for the 'oauth' event.
  clearOauthListeners() {
    ipcRenderer.removeAllListeners('oauth')
  }
})
