import { FullReportData } from '../types/MediaCompactedData'

const DataFullReport: FullReportData = {
  MediaCompactedData: [],
  errors: []
}

export function pushError(err: unknown, url: string): void {
  if (err instanceof Error) {
    DataFullReport.errors.push({
      name: err.name,
      message: err.message,
      target: url
    })
  }
}

export function cleanFullDataReport(): void{
  DataFullReport.MediaCompactedData = []
  DataFullReport.errors = []
}

export { DataFullReport }
