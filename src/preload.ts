// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron'

import type { TokenResponse } from './types'

contextBridge.exposeInMainWorld('electronAPI', {
  // clear oauth after we load it, we'll only need the listener once
  clearOauthListeners() {
    ipcRenderer.removeAllListeners('oauth')
  },
  onOauth(callback: (token: TokenResponse) => void) {
    ipcRenderer.on('oauth', (_event, token: TokenResponse) => {
      callback(token)
    })
  },

  // context menu stuff
  onContextMenuCommand: (callback: (command: string) => void) => {
    ipcRenderer.on('context-menu-command', (_event, command) => callback(command))
  },
  showContextMenu: () => ipcRenderer.send('show-context-menu'),
})
