import { GetMediaMetaData } from '../Downloader/GetMediaMetaData.js'
import type { mediaFullMetadata } from '../types/DownloadMetaData_Type.js'
import type { MediaCompactedData } from '../types/MediaCompactedData.js'
import type { PlaylistData } from '../types/playlistType.js'
import GetMediaFormats from './GetMediaFormats.js'
import UrlIsPlayList from './UrlIsPlayList.js'
import { FullReportData } from '../types/MediaCompactedData.js'
import { DataFullReport, pushError } from '../Variables/report.js'
import { userConfig } from '../Variables/userConfig.js'

export default async function GetUrlsCompactedMetadata(): Promise<FullReportData> {
  for (const url of userConfig.settings.urls) {
    try {
      console.log("getUrlCompactedMetadata loop url" + url)
      const MetaData: mediaFullMetadata | PlaylistData = await GetMediaMetaData(
        url,
        userConfig.settings.listStart,
        userConfig.settings.listEnd
      )

      if (UrlIsPlayList(url)) {

        await ParseMetaDataAsPlaylistData(MetaData)
      } else {

        await ParseMetadataAsMediaFullMetadata(MetaData)
      }
    } catch (err: unknown) {
      pushError(err, url)
      continue
    }
  }

  return DataFullReport
}

//separating these things to make the code cleaner, since it was being pretty hard to maintain  -_-

async function ParseMetaDataAsPlaylistData(
  MetaData: mediaFullMetadata | PlaylistData
): Promise<void> {
  for (const entry of (MetaData as PlaylistData).entries) {
    try {
      const entryMetadata = await GetMediaMetaData(
        entry.url,
        userConfig.settings.listStart,
        userConfig.settings.listEnd
      )
      const media = CompactMetadata(entryMetadata)
      DataFullReport.MediaCompactedData.push(media)
    } catch (err: unknown) {
      pushError(err, entry.url)
      continue
    }
  }
}

async function ParseMetadataAsMediaFullMetadata(
  MetaData: mediaFullMetadata | PlaylistData
): Promise<void> {
  for (const entry of [MetaData as mediaFullMetadata]) {
    
    try {
      const media = CompactMetadata(entry)
      DataFullReport.MediaCompactedData.push(media)
    } catch (err: unknown) {

      pushError(err, entry.original_url)
      continue
    }
  }
}
//function to compact the metada
function CompactMetadata(data: mediaFullMetadata): MediaCompactedData {
  const media: MediaCompactedData = {
    id: data.id,
    title: data.title,
    channel_name: data.channel,
    channel_url: data.channel_url,
    video_url: data.original_url,
    thumbnail: data.thumbnail,
    thumbnails: data.thumbnails,
    duration: data.duration,
    view_count: data.view_count,
    average_rating: data.average_rating,
    format_data: GetMediaFormats(data.formats, data.original_url)
  }

  return media
}
