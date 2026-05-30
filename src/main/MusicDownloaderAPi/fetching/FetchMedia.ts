import youtubeDl from 'youtube-dl-exec'

import type { mediaFullMetadata } from '../types/DownloadMetaData_Type.js'

export async function FetchMedia(url: string): Promise<mediaFullMetadata> {
  const yt = youtubeDl.create('./bin/yt-dlp.exe')

  const payloadData = await yt(url, {
    dumpSingleJson: true,
    skipDownload: true,
    noWarnings: true,
    jsRuntimes: 'node'
  })

  const stringData = await JSON.stringify(payloadData)

  const metadata: mediaFullMetadata = await JSON.parse(stringData)

  return metadata
}
