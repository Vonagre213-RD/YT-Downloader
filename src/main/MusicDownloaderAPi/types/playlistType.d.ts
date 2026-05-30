export interface Thumbnail {
  url: string
  height: number
  width: number
}

export interface PlaylistEntry {
  _type: 'url'
  ie_key: string
  id: string
  url: string
  title: string
  description: string | null
  duration: number
  channel_id: string | null
  channel: string | null
  channel_url: string | null
  uploader: string | null
  uploader_id: string | null
  uploader_url: string | null
  thumbnails: Thumbnail[]
  timestamp: number | null
  release_timestamp: number | null
  availability: string | null
  view_count: number | null
  live_status: string | null
  channel_is_verified: boolean | null
  __x_forwarded_for_ip: string | null
}

export interface PlaylistData {
  id: string
  title: string
  _type: 'playlist'
  entries: PlaylistEntry[]
}
