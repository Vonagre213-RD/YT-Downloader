import type { MediaFormat, QualitiesData } from '../types/mediaFormats.js'
import { pushError } from '../Variables/report.js'


export default function ReduceMediaFormats(formats: MediaFormat[], url: string): MediaFormat[] {
  const reducedFormats: MediaFormat[] = [
    { format: 'Video', qualities: [] },
    { format: 'Audio Only', qualities: [] }
  ]

  formats.forEach((f: MediaFormat) => {
    try {
      if (f.format == 'Video') {
        const newValues: QualitiesData[] = []

        let previousValue = f.qualities[0]

        for (const [index, current] of f.qualities.entries()) {
          if (current.format_note !== previousValue?.format_note) {
            newValues.push(previousValue!)
          }

          if (current.abr! > previousValue!.abr! || index == f.qualities.length - 1) {
            newValues.push(current)
          }
          previousValue = current
        }

        reducedFormats.find((s) => s.format == 'Video')!.qualities = newValues
      }

      if (f.format == 'Audio Only') {
        const newValues: QualitiesData[] = []

        let previousValue = f.qualities[0]
        for (const [index, current] of f.qualities.entries()) {
          if(current.filesize_approx == undefined || current.format_note == undefined || current.abr == undefined){
            continue
          }
          if (current.format_note !== previousValue?.format_note) {
            newValues.push(previousValue!)
          }

          if (current.abr! > previousValue!.abr! || index == f.qualities.length - 1) {
            newValues.push(current)
          }
          previousValue = current
        }

        reducedFormats.find((s) => s.format == 'Audio Only')!.qualities = newValues
      }
    } catch (err: unknown) {
      pushError(err, url)
    }
  })


  return reducedFormats
}
