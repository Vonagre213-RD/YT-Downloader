import youtubeDl, { Flags } from 'youtube-dl-exec'
import * as fs from 'node:fs'
import { mediaFullMetadata } from '../types/DownloadMetaData_Type'
import path from 'node:path'
import { app } from 'electron'

export async function GetMediaMetaData(
  url: string,
  start: number,
  end: number | string
): Promise<mediaFullMetadata> {

  let limit
  if (start <= 0) {
    limit = 1
  }

  const cookiesDestPath = path.join(app.getPath('userData'), 'cookies/cookies.txt')
  const yt = youtubeDl.create(path.join(app.getPath('userData'), 'bin/yt-dlp.exe'))


  const options: Flags = {
    noWarnings: true,
    dumpSingleJson: true,
    flatPlaylist: true,
    jsRuntimes: 'node',
    ignoreErrors: true,
    playlistStart: limit,


    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    bufferSize: `${1024 * 1024}`
  }

  if (end != 'all') {
    options.playlistEnd = Number(end) == 0 ? 1 : Number(end)
  }
  if (fs.existsSync(cookiesDestPath)) {
    options.cookies = cookiesDestPath
  }
  const output = await yt.exec(url, options)

  


  const data = JSON.parse(output.stdout)


  return data
}
