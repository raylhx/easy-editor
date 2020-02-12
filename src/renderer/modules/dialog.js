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
export const getSavePath = extensions => {
  const browserWindow = remote.BrowserWindow
  const focusedWindow = browserWindow.getFocusedWindow()

  return dialog.showSaveDialog(focusedWindow, {
    title: 'Save File Dialog',
    filters: extensions
  })
}

export const openDialog = (type, message) => {
  const browserWindow = remote.BrowserWindow
  const focusedWindow = browserWindow.getFocusedWindow()

  return dialog.showMessageBox(focusedWindow, {
    title: type,
    type: type,
    buttons: ['OK'],
    detail: message
  })
}
