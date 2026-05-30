import { ElectronAPI } from '@electron-toolkit/preload'
import { errorType } from '@renderer/types/ReportInterface'
import { userConfigInterface } from '@renderer/types/userConfigInterface'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      testingIpc: () => {}
      getMetadata: (urls: string[]) => promise<{}>
      dialogOpenDirectory: () => string
      downloadVideo: (formatId: string, url: string, output: string) => promise<boolean>
      sendCookies: (cookies: Uint8Array<ArrayBuffer>) => {}
      saveUserSettings: (userSettings: userConfigInterface) => promise<errorType[]>
      getConfigData: () => Promise<userConfigInterface>
      isYtDlpInstalled: () => Promise<boolean>
      installYtDlp: () => Promise<{ success: boolean; errors: errorType[] }>
      isFfmpegInstalled: () => Promise<boolean>
      installFfmpeg: () => Promise<{ success: boolean; errors: errorType[] }>
    }
  }
}
