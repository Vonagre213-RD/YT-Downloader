export interface mediaFullMetadata {
  id: string
  title: string
  formats: Format[]
  thumbnails: Thumbnail[]
  thumbnail: string
  description: string
  channel_id: string
  channel_url: string
  duration: number
  view_count: number
  average_rating: number | null
  age_limit: number
  webpage_url: string
  categories: string[]
  tags: string[]
  playable_in_embed: boolean
  live_status: string
  release_timestamp: number | null
  _format_sort_fields: string[]
  automatic_captions: { [key: string]: Caption[] }
  subtitles: { [key: string]: Caption[] }
  comment_count: number
  chapters: Chapter[] | null
  heatmap: HeatmapPoint[]
  like_count: number
  channel: string
  channel_follower_count: number
  creators: string[] | null
  channel_is_verified: boolean
  uploader: string
  uploader_id: string
  uploader_url: string
  upload_date: string
  timestamp: number
  availability: string
  original_url: string
  webpage_url_basename: string
  webpage_url_domain: string
  extractor: string
  extractor_key: string
  playlist: string | null
  playlist_index: number | null
  display_id: string
  fulltitle: string
  duration_string: string
  release_date: string
  release_year: number
  is_live: boolean
  was_live: boolean
  requested_subtitles: any | null
  _has_drm: boolean | null
  epoch: number
  requested_downloads: RequestedDownload[]
  requested_formats: RequestedFormat[]
  format: string
  format_id: string
  ext: string
  protocol: string
  language: string
  format_note: string
  filesize_approx: number
  tbr: number
  width: number
  height: number
  resolution: string
  fps: number
  dynamic_range: string
  vcodec: string
  vbr: number
  stretched_ratio: number | null
  aspect_ratio: number
  acodec: string
  abr: number
  asr: number
  audio_channels: number
  _type: string
  _version: VersionInfo
}

export interface Format {
  format_id: string
  format_note?: string
  ext: string
  protocol: string
  acodec: string
  vcodec: string
  url: string
  width: number | null
  height: number | null
  fps: number | null
  rows?: number
  columns?: number
  fragments?: Fragment[]
  audio_ext: string
  video_ext: string
  vbr: number | null
  abr: number | null
  tbr: number | null
  resolution: string
  aspect_ratio: number | null
  filesize_approx: number | null
  http_headers: HttpHeaders
  format: string
  asr?: number | null
  filesize?: number | null
  source_preference?: number
  audio_channels?: number | null
  quality?: number
  has_drm?: boolean
  language?: string | null
  language_preference?: number
  preference?: number | null
  container?: string
  available_at?: number
  downloader_options?: DownloaderOptions
  manifest_url?: string
}

export interface Fragment {
  url: string
  duration: number
}

export interface Thumbnail {
  url: string
  preference: number
  id: string
  width?: number
  height?: number
  resolution?: string
}

export interface Caption {
  ext: string
  url: string
  name?: string
  impersonate?: boolean
  __yt_dlp_client?: string
  video_id?: string
  protocol?: string
}

export interface Chapter {
  start_time: number
  end_time: number
  title: string
}

export interface HeatmapPoint {
  start_time: number
  end_time: number
  value: number
}

export interface RequestedDownload {
  requested_formats: RequestedFormat[]
  format: string
  format_id: string
  ext: string
  protocol: string
  language: string
  format_note: string
  filesize_approx: number
  tbr: number
  width: number
  height: number
  resolution: string
  fps: number
  dynamic_range: string
  vcodec: string
  vbr: number
  aspect_ratio: number
  acodec: string
  abr: number
  asr: number
  audio_channels: number
  _filename: string
  filename: string
  __write_download_archive: boolean
}

export interface RequestedFormat {
  asr: number | null
  filesize: number | null
  format_id: string
  format_note: string
  source_preference: number
  fps: number | null
  audio_channels: number | null
  height: number | null
  quality: number
  has_drm: boolean
  tbr: number
  filesize_approx: number
  width: number | null
  language: string | null
  language_preference: number
  preference: number | null
  ext: string
  vcodec: string
  acodec: string
  dynamic_range: string | null
  container: string
  url: string
  available_at: number
  downloader_options: DownloaderOptions
  protocol: string
  video_ext: string
  audio_ext: string
  abr: number
  vbr: number
  resolution: string
  aspect_ratio: number | null
  http_headers: HttpHeaders
  format: string
}

export interface DownloaderOptions {
  http_chunk_size: number
}

export interface HttpHeaders {
  'User-Agent': string
  Accept: string
  'Accept-Language': string
  'Sec-Fetch-Mode': string
}

export interface VersionInfo {
  version: string
  current_git_head: string | null
  release_git_head: string
  repository: string
}
