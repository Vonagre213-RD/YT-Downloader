// import { FetchMedia } from '../fetching/FetchMedia.js'
// import { DownloadMedia } from './DownloadMedia.js'
// import { ReportCreator } from '../utils/reportCreator.js'
// import { report } from '../Variables/report.js'
// import { SanitizeMetadata } from '../utils/parseMetadata.js'
// import chalk from 'chalk'

// export async function BulkDownloader(
//   urls: string[],
//   format: string,
//   output: string,
//   qualityId: string
// ) {
//   for (let url of urls) {
//     try {
//       let metadata = await FetchMedia(url, format, output)
//       await DownloadMedia(url, format, output, qualityId)

//       report.downloadedVideos.push(SanitizeMetadata(metadata))
//     } catch (err) {
//       if (err instanceof Error) {
//         // console.log(chalk.red(`!!!==== there was an error: ${err.message}!!!!`));
//         continue
//       }
//     }
//   }

//   ReportCreator()
// }
