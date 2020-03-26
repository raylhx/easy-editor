'use strict'

import {
  app,
  BrowserWindow,
  Menu
  // MenuItem
} from 'electron'

// 如果是使用插件的话，这一行代码需要引入
// import './../renderer/store/index'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development' ? `http://localhost:9080/` : `file://${__dirname}/index.html`

const template = [
  {
    label: 'Application',
    submenu: [{label: 'Quit', accelerator: 'Command+Q', click: function () { app.quit() }}]
  },
  {
    label: 'Edit',
    submenu: [
      { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
      { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' }
    ]
  }
]

function createWindow () {
  /**
   * Initial window options
   */
  Menu.setApplicationMenu(process.platform === 'darwin' ? Menu.buildFromTemplate(template) : null)

  mainWindow = new BrowserWindow({
    height: 558,
    width: 1000
    // autoHideMenuBar: true
    // useContentSize: true
  })

  mainWindow.webContents.openDevTools()
  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// if (process.platform === 'darwin') {
//   const template = [
//     {
//       label: 'Application',
//       submenu: [{label: 'Quit', accelerator: 'Command+Q', click: function () { app.quit() }}]
//     },
//     {
//       label: 'Edit',
//       submenu: [
//         { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
//         { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' }
//       ]
//     }
//   ]
//   const menu = Menu.buildFromTemplate(template)
//   Menu.setApplicationMenu(menu)
// } else {
//   Menu.setApplicationMenu(null)
// }

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
