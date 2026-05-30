import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import type { userConfigInterface } from '../main/types/userConfigInterface'
// Custom APIs for renderer
const api = {
  testingIpc: () => ipcRenderer.invoke('testing-Ipc'),
  getMetadata: (url: string[]) => ipcRenderer.invoke('getMetadata', url),
  dialogOpenDirectory: () => ipcRenderer.invoke('dialog:openDirectory'),
  downloadVideo: (formatId, url, output) => ipcRenderer.invoke('downloadVideo', formatId, url, output),
  sendCookies: (cookie) => ipcRenderer.invoke('sendCookies', cookie),
  saveUserSettings: (userSettings: userConfigInterface) => ipcRenderer.invoke('saveUserSettings', userSettings),
  getConfigData: () => ipcRenderer.invoke('getConfigData'),
  isYtDlpInstalled: () => ipcRenderer.invoke('isYtDlpInstalled'),
  installYtDlp: () => ipcRenderer.invoke('installYtDlp'),
  isFfmpegInstalled: () => ipcRenderer.invoke('isFfmpegInstalled'),
  installFfmpeg: () => ipcRenderer.invoke('installFfmpeg')
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
