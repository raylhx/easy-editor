import electron from 'electron'

const {
  remote
} = electron
const {
  dialog
} = remote

/**
 * @description 获取保存文件路径
 * @param {Array} extensions
 */
export const getSavePath = (name, extensions) => {
  const browserWindow = remote.BrowserWindow
  const focusedWindow = browserWindow.getFocusedWindow()

  return dialog.showSaveDialog(focusedWindow, {
    title: 'Save File Dialog',
    defaultPath: name,
    filters: extensions
  })
}

/**
 *
 * @param {Object} config
 * type: none info error error warning question
 * {
    title: type,
    type: type,
    buttons: ['OK','No'],
    detail: message
  }
 */
export const openDialog = (config) => {
  const browserWindow = remote.BrowserWindow
  const focusedWindow = browserWindow.getFocusedWindow()

  return dialog.showMessageBox(focusedWindow, config)
}

export const selectFileDialog = (type, message) => {
  const browserWindow = remote.BrowserWindow
  const focusedWindow = browserWindow.getFocusedWindow()

  return dialog.showOpenDialog(focusedWindow, {
    title: 'Open File',
    filters: ['html'], // todo 这里暂时写html，之后再写
    properties: ['openFile']
  })
}
