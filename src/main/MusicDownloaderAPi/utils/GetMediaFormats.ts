import type { MediaFormat } from '../types/mediaFormats.js'
import type { Format } from '../types/DownloadMetaData_Type.js'
import ReduceMediaFormats from './ReduceMediaFormats.js'
import { pushError } from '../Variables/report.js'

export default function GetMediaFormats(formats: Format[], url: string): MediaFormat[] {
  const mediaFormats: MediaFormat[] = [
    {
      format: 'Video',
      qualities: []
    },
    {
      format: 'Audio Only',
      qualities: []
    }
  ]

  formats.map((f) => {
    try {
      const format = {
        format: f.format,
        qualityId: f.format_id,
        audio_ext: f.audio_ext,
        video_ext: f.video_ext,
        acodec: f.acodec,
        vcodec: f.vcodec,
        resolution: f.resolution,
        format_note: f.format_note,
        filesize_approx: f.filesize_approx,
        abr: f.abr,
        width: f.width,
        height: f.height,
        tbr: f.tbr
      }
      if (f.vcodec !== 'none' && !f.resolution?.includes('audio only')) {
        mediaFormats.find((f) => f.format == 'Video')?.qualities.push(format)
      }
      if (f.acodec !== 'none' && f.resolution?.includes('audio only')) {
        mediaFormats.find((f) => f.format == 'Audio Only')?.qualities.push(format)
      }
    } catch (err) {
      pushError(err, url)
    }
  })

  mediaFormats.forEach((formats) => {
    formats.qualities.sort((a, b) => (a.abr ?? 0) - (b.abr ?? 0))
  })

  return ReduceMediaFormats(mediaFormats, url)
}
