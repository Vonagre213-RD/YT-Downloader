import path from 'path'
import { userConfigInterface } from '../../types/userConfigInterface'
import * as fs from 'fs'
import { app } from 'electron'
import { errorType } from '../types/ReportInterface'
import CreateCookieFile from './createCookiesFile'

export default async function SetUserSettings(
  userSettings: userConfigInterface
): Promise<errorType[]> {
  const Errors: errorType[] = []
  try {
    if (userSettings.settings.listStart <= 0) {
      Errors.push({
        name: 'listStart',
        message: "List start can't be lower or equal than 0",
        target: String(userSettings.settings.listStart)
      })
    }

    if (
      typeof userSettings.settings.listEnd == typeof Number &&
      (userSettings.settings.listEnd as number) <= 0
    ) {
      Errors.push({
        name: 'listEnd',
        message: "List end can't be bigger than 60",
        target: String(userSettings.settings.listEnd)
      })
    }

    if (
      typeof userSettings.settings.listEnd == typeof Number &&
      (userSettings.settings.listEnd as string).toLowerCase() !== 'all'
    ) {
      Errors.push({
        name: 'listEnd',
        message: 'If you want to download the full list you must write "all"',
        target: String(userSettings.settings.listEnd)
      })
    }
    if (userSettings.settings.outputPath == undefined || userSettings.settings.outputPath == ' ') {
      fs.mkdirSync(path.join(app.getPath('userData'), 'cookies'), { recursive: true })
    }
    else {
      fs.mkdirSync(path.join(app.getPath('userData'), 'cookies'), { recursive: true })
    }

    if (userSettings.settings.cookies == null) {
      Errors.push({
        name: 'cookies',
        message: 'Cookies file not found',
        target: 'null'
      })
    }
    CreateCookieFile(userSettings.settings.cookies as Uint8Array<ArrayBuffer>)

    const settingsFilePath = path.join(app.getPath('userData'), 'settings')
    if (!fs.existsSync(settingsFilePath)) {
      fs.mkdirSync(settingsFilePath)
    }

    fs.writeFileSync(`${settingsFilePath}/settings.json`, JSON.stringify({settings: {...userSettings.settings, urls: []}}))

    return Errors
  } catch (err: unknown) {
    if (err instanceof Error) {
      Errors.push({
        name: 'error',
        message: err.message,
        target: 'unknown'
      })
    }
    return Errors
  }
}
