import type { mediaFullMetadata } from '../types/DownloadMetaData_Type.js'
import type { MediaCompactedData, MediaFormat } from '../types/MediaCompactedData.js'
import GetMediaFormats from './GetMediaFormats.js'

export function SanitizeMetadata(metadata: mediaFullMetadata): MediaCompactedData {
  const formatData: MediaFormat[] = GetMediaFormats(metadata.formats, metadata.original_url)
  //say whalagi
  const basicMetadata: MediaCompactedData = {
    view_count: metadata.view_count,
    video_url: metadata.original_url,
    id: metadata.id,
    title: metadata.title,
    channel_name: metadata.channel,
    channel_url: metadata.channel_url,
    duration: metadata.duration,
    average_rating: metadata.average_rating,
    thumbnail: metadata.thumbnail,
    thumbnails: metadata.thumbnails,
    format_data: formatData
  }

  return basicMetadata
}
