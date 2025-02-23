import { app, BrowserWindow, ipcMain, protocol, Menu } from 'electron'
import started from 'electron-squirrel-startup';
import Store from 'electron-store';
import path from 'path'

import { exchangeAuthorizationCodeForToken } from './api/auth'
import { applicationName, deeplinkUrl } from './constants/constants'

const store = new Store();
const isAppReinstantiated = app.requestSingleInstanceLock()
let mainWindow: BrowserWindow | null
protocol.registerSchemesAsPrivileged([
  { scheme: deeplinkUrl, privileges: { standard: true, secure: true, supportFetchAPI: true } }
])

if (started) {
  app.quit()
}

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 1200,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  })

  // right click context menu
  ipcMain.on('show-context-menu', (event) => {
    const template: Electron.MenuItemConstructorOptions[] = [
      {
        label: 'Copy                              📋',
        role: 'copy',
      },
      {
        label: 'Paste                              📝',
        role: 'paste'
      },
      {
        label: 'Reload                            🔄',
        role: 'reload'
      },
      { type: 'separator' },
      {
        label: 'Select All                         🔍',
        role: 'selectAll'
      },
      { type: 'separator' },
      {
        label: 'Toggle DevTools              📱',
        role: 'toggleDevTools'
      },
    ];

    const menu = Menu.buildFromTemplate(template)
    menu.popup({ window: BrowserWindow.fromWebContents(event.sender) })
  })

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`))
  }

  mainWindow.on('closed', () => {
    // Clean up any memory leaks
    mainWindow = null
  })

  mainWindow.webContents.openDevTools()
}

if (!isAppReinstantiated) {
  app.quit()
} else {
  app.on('second-instance', (_, commandLine) => {
    // Focus the main window if the app is opened again with a new instance
    if (mainWindow && !mainWindow.isDestroyed()) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore()
      }

      mainWindow.focus()
    }

    // Grab the oauth token passed to the instance, it's guaranteed to be the last value in commandLine
    const protocolUrl = commandLine[commandLine.length - 1]
    if (protocolUrl) {
      const url = new URL(protocolUrl)
      const authorizationCode = url.searchParams.get('code');
      const error = url.searchParams.get('error');

      if (error) {
        // Send error to client
        mainWindow?.webContents.send('oauth-error', { error, description: url.searchParams.get('error_description') || 'Authorization declined' });
        return;
      }

      // async IIFE so we can use await, do the token exchange
      (async () => {
        try {
          const tokenResponse = await exchangeAuthorizationCodeForToken(authorizationCode);
          // store new token
          store.set('auth', {
            ...tokenResponse
          });

          // send new token to client
          mainWindow?.webContents.send('oauth', tokenResponse);
        } catch (error) {
          console.error('Failed to exchange authorization code for token:', error);
        }
      })();
    }
  })

  app.whenReady().then(() => {
    createWindow();
  })
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient(applicationName, process.execPath, [path.resolve(process.argv[1])])
  }
} else {
  app.setAsDefaultProtocolClient(applicationName)
}

ipcMain.handle('get-stored-auth', () => {
  return store.get('auth');
});

ipcMain.handle('delete-stored-auth', () => {
  store.delete('auth');
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
