import type { MediaFormat, QualitiesData, MediaFormatData, ThumbnailType } from './mediaFormats.js'
import { errorType } from './ReportInterface.js'

export interface MediaCompactedData {
  id: string
  title: string
  channel_name: string
  channel_url: string
  video_url: string
  thumbnail: string
  thumbnails: ThumbnailType[]
  duration: number
  view_count: number
  average_rating: number | null
  format_data: MediaFormat[]
}

export interface FullReportData {
  MediaCompactedData: MediaCompactedData[]
  errors: errorType[]
}
export type { MediaFormat, QualitiesData, MediaFormatData }
