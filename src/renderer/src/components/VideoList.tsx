import type { MediaCompactedData } from '../types/mediaCompactedData'
import VideoCard from './molecules/VideoCard'
interface props {
  videos: MediaCompactedData[]
}
export default function VideoList({ videos }: props)  : React.ReactNode  {
  return (
    <div className="space-y-4">
      {videos.map((v) => (
        <VideoCard key={v.id} video={v} />
      ))}
    </div>
  )
}
