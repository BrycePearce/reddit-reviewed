import { app, BrowserWindow, protocol } from 'electron'
import path from 'path'
import { applicationName, deeplinkUrl } from './constants/constants'

const isAppReinstantiated = app.requestSingleInstanceLock()
let mainWindow: BrowserWindow | null

if (require('electron-squirrel-startup')) {
  app.quit()
}

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
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
      const oAuthToken = url.searchParams.get('code')
      mainWindow?.webContents.send('oauth', oAuthToken)
    }
  })

  app.whenReady().then(() => {
    createWindow()
    protocol.registerSchemesAsPrivileged([
      { scheme: deeplinkUrl, privileges: { standard: true, secure: true, supportFetchAPI: true } }
    ])
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

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
