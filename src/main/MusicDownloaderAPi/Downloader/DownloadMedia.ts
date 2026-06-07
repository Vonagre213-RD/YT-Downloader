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
  output: string,
  formatType: string
): Promise<boolean> {
  console.log("s" + path.join(app.getPath('userData'), 'bin/yt-dlp.exe'))

  const yt = youtubeDl.create(path.join(app.getPath('userData'), 'bin/yt-dlp.exe'))
  const ffmgpegPath = path.join(app.getPath('userData'), 'bin/ffmpeg/ffmpeg.exe')

  const options: Flags = {
    format: `${formatId}`,
    cookies: path.join(app.getPath('userData'), 'cookies/cookies.txt')
  }

  if (!fs.existsSync(output)) {
    fs.mkdirSync(output, { recursive: true })
  }



  if (IsFfmpegInstalled()) {
    options.ffmpegLocation = ffmgpegPath
    options.postprocessorArgs = 'ThumbnailsConvertor+ffmpeg:-c:v mjpeg'
    options.embedThumbnail = true,
      options.addMetadata = true
    options.embedSubs = true

    if (formatType === 'video') {
      options.format = `${formatId}+ba`,
        options.mergeOutputFormat = 'mp4',
        options.postprocessorArgs = '-c:a aac -b:a 192k',
        options.recodeVideo = 'mp4'
    }
    else {
      options.extractAudio = true
      options.audioFormat = 'm4a'
      options.keepVideo = false
    }

  }




  try {
    const subprocess = yt.exec(url, {
      ...options,
      jsRuntimes: 'node',
      output: `${output}/%(title)s.%(ext)s`,
      verbose: true
    })

    subprocess.stdout?.on('data', (data) => console.log('[yt-dlp]', data.toString()))
    subprocess.stderr?.on('data', (data) => console.log('[yt-dlp stderr]', data.toString()))

    await subprocess
    return true
  } catch (err: unknown) {
    pushError(err, url)
    return false
  }
}
