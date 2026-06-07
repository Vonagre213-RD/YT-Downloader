import type { MediaCompactedData } from '../../types/mediaCompactedData'
import type { QualitiesData } from '../../types/mediaFormats'
import DownloadFormatButton from '../atoms/downloadFormatButton'
import BytesToMegaByte from '../../functions/BytesToMegaByte'

export default function VideoCardInfo({ video }: { video: MediaCompactedData }): React.ReactNode {
  const videoQualities = video.format_data.find((f) => f.format === 'Video')?.qualities ?? []
  const audioQualities = video.format_data.find((f) => f.format === 'Audio Only')?.qualities ?? []

  return (
    <div className="border-t border-neutral-800 p-4">
      {videoQualities.length > 0 && (
        <div className="mb-4 ">
          <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-3">
            Video
          </h3>
          <div className="flex flex-wrap gap-2">
            {videoQualities.map((q: QualitiesData) : React.ReactNode=> {

              if (!(q.format_note == undefined))
                return <DownloadFormatButton
                  url={video.video_url}
                  key={q.qualityId}
                  formatId={q.qualityId}
                  formatType='video'
                  formatNote={`Resolution: ${q.format_note}`}
                  filesize={BytesToMegaByte(q.filesize_approx)}
                />

                return
            })}
          </div>
        </div>
      )}

      {audioQualities.length > 0 && (
        <div>
          <h3 className="text-xs font-medium text-neutral-500">Audio Only</h3>
          <div className="flex flex-wrap gap-2">
            {audioQualities.map((q: QualitiesData): React.ReactNode => {
              if (!(q.format_note == undefined))
                return <DownloadFormatButton
                  key={q.qualityId}
                  formatId={q.qualityId}
                  url={video.video_url}
                  formatType='audio_only'
                  formatNote={`Audio Quality ${q.abr} kbps`}
                  filesize={BytesToMegaByte(q.filesize_approx)}
                />
                return
            })}
          </div>
        </div>
      )}
    </div>
  )
}
