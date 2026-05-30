import type { MediaCompactedData } from '../../types/mediaCompactedData'
import VideoCardInfo from './VideoCardInfo'
import SecondsToMinutes from '../../functions/SecondsToMinutes'
import React from 'react'

export default function VideoCard({ video }: { video: MediaCompactedData }) : React.ReactNode {
  return (
    <details className=" bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden  ">
      <summary className="flex items-center gap-4 p-3 cursor-pointer ">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-40 h-24 object-cover rounded-lg  bg-neutral-800"
        />
        <div className="min-w-0 ">
          <h2 className="text-sm font-medium text-neutral-100 truncate">{video.title}</h2>
          <p className="text-xs text-neutral-500 mt-1">{video.channel_name}</p>
          <a
            title="a"
            rel="noopener"
            href={video.video_url}
            className="text-xs text-neutral-500 mt-1"
          >
            {video.video_url}
          </a>
          <div className="flex items-center gap-3 text-xs text-neutral-600 mt-1">
            <span>{SecondsToMinutes(video.duration)}</span>
            <span>{video.view_count} views</span>
          </div>
        </div>
      </summary>
      <VideoCardInfo video={video} />
    </details>
  )
}
