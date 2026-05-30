import { errorType } from '../types/ReportInterface'
import { ytDLDownloadUrl } from '../Variables/BaseUrls';
import { app } from 'electron';
import * as fs from 'fs'
import path from 'path';
import { finished} from 'stream/promises';
import { Readable } from 'stream';


export async function installYtDlp(): Promise<{ success: boolean; errors: errorType[] }> {
  try {
    const ytdlFolderPath = path.join(app.getPath('userData'), 'bin')
    const res = await fetch(ytDLDownloadUrl)

    if (!fs.existsSync(ytdlFolderPath)) {
      fs.mkdirSync(ytdlFolderPath)
    }
    if (res == null) {
      throw new Error("res was, empty when trying to fetch download data ");
    }
    const ytdlFilePath = path.join(ytdlFolderPath, "yt-dlp.exe")
    const fileWriteStream = fs.createWriteStream(ytdlFilePath)



    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await finished(Readable.fromWeb(res!.body as any).pipe(fileWriteStream))

    console.log("Hola")
    return { success: true, errors: [] }


  } catch (err) {
    return {
      success: false,
      errors: [
        {
          name: 'installYtDlpError',
          message: err instanceof Error ? err.message : String(err),
          target: 'yt-dlp'
        }
      ]
    }
  }
}
