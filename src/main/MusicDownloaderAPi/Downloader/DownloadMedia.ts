import youtubeDl from 'youtube-dl-exec'
import type { Flags } from 'youtube-dl-exec'
import * as fs from 'fs'
import path from 'path'
import { app } from 'electron'
import { pushError } from '../Variables/report'
import { IsFfmpegInstalled } from '../utils/IsFfmpegInstalled'

export async function DownloadMedia(
  formatId: string,
  url: string,
  output: string
): Promise<boolean> {
    console.log("s" + path.join(app.getPath('userData'), 'bin/yt-dlp.exe'))

  const yt = youtubeDl.create(path.join(app.getPath('userData'), 'bin/yt-dlp.exe'))
  const ffmgpegFolderPath = path.join(app.getPath('userData'), 'bin/ffmpeg/')

  const options: Flags = {
    format: formatId,
    cookies: path.join(app.getPath('userData'), 'cookies/cookies.txt')
  }

  if (fs.existsSync(output)) {
    fs.mkdirSync(output, { recursive: true })
  }



  if (IsFfmpegInstalled()) {
    options.ffmpegLocation = ffmgpegFolderPath
    options.embedSubs = true,
    options.embedThumbnail = true,
    options.addMetadata = true
  }




  try {
    await yt.exec(url, {
      ...options,

      jsRuntimes: 'node',
      output: `${output}/%(title)s.%(ext)s`
    })
    return true
  } catch (err: unknown) {
    pushError(err, url)
    return false
  }
}
