import * as fs from 'fs'
import path from 'path'
import { app } from 'electron'

export default async function CreateCookieFile(
  cookiesFile: Uint8Array<ArrayBuffer> | null
): Promise<void> {
  if(cookiesFile == null){
    return
  }
  const cookiesDestFolder = path.join(app.getPath('userData'), 'cookies')

  if (!fs.existsSync(cookiesDestFolder)) {
    fs.mkdirSync(cookiesDestFolder, { recursive: true })
  }

  const cookiesDestFilePath = path.join(cookiesDestFolder, 'cookies.txt')

  fs.writeFileSync(cookiesDestFilePath, cookiesFile)
}


