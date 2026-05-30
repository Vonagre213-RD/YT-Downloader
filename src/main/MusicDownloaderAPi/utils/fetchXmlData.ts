import { XMLParser } from 'fast-xml-parser'
import * as fs from 'fs'
import path from 'path'
import { app } from 'electron'
import type { XMLdownloadDataType } from '../types/downloadDataType.js'

export async function FetchXmlData(): Promise<XMLdownloadDataType> {
  const parser = new XMLParser({ attributeNamePrefix: '', ignoreAttributes: false })
  const downloadFilePath = path.join(app.getPath('userData'), 'downloadData.xml')

  if (!fs.existsSync(downloadFilePath)) {
    fs.writeFileSync(
      downloadFilePath,
      `
            <downloadData format=""  output="">
            <videosUrl>
            </videosUrl>
            </downloadData>
        `
    )

    process.exit()
  }
  const downloadFile = fs.readFileSync(downloadFilePath)
  const xmlData: XMLdownloadDataType = await parser.parse(downloadFile)
  return xmlData
}
