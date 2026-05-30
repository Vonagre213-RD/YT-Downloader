export interface MediaFormat {
  format: string
  qualities: QualitiesData[]
}

export interface QualitiesData {
  qualityId: string
  video_ext: string
  audio_ext: string
  acodec: string
  vcodec: string
  resolution: string
  format_note: string | undefined
  filesize_approx: number | null
  abr: number | null
  width: number | null
  height: number | null
  tbr: number | null
}

export type ThumbnailType = {
  url: string
  preference: number
  id: string
}

export interface MediaFormatData {
  videoUrl: string
  videoName: string
  thumbnail: string
  data: MediaFormat[]
}

export interface MediaData {
  id: string
  title: string
  videoUrl: string
  thumbnail: string
  channel_name: string
  channel_url: string
  duration: number
  view_count: number
  average_rating: number | null
  data: MediaFormat[]
}
