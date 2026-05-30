import React, { useState, useRef, useContext } from 'react'
import { FullReportData } from '@renderer/types/mediaCompactedData'
import { GeneralUserDataContext } from '../Contexts/GeneralUserDataContext'

interface props {
  setVideos: React.Dispatch<React.SetStateAction<FullReportData>>
  setIsOpenVideoArrayModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function MainSubmitForm({
  setIsOpenVideoArrayModal,
  setVideos
}: props): React.ReactNode {
  const [loading, setLoading] = useState(false)
  const [isThereAVideo, setIsThereAvideo] = useState<boolean>(false)
  const urlRef = useRef<null | HTMLInputElement>(null)
  const { settings } = useContext(GeneralUserDataContext)

  const onSubmitVideoUrl = async (): Promise<void> => {
    if (urlRef.current! == null) {
      return
    }
    setLoading(true)

    const newSettings = {
      settings: {
        ...settings.settings,
        urls: [...settings.settings.urls, urlRef.current.value]
      }
    }
    const data = await window.api.getMetadata(newSettings.settings.urls)

    
    setVideos(data)
    setLoading(false)
    console.log(settings.settings.urls )
  }
  const theresAVideo = (): void => {
    if (urlRef.current! == null) {
      return
    }

    if (urlRef.current.value.includes('https://www.youtube.com' ) || urlRef.current.value.includes('https://youtu.be/' )) {
      setIsThereAvideo(true)
    } else {
      setIsThereAvideo(false)
    }
  }

  return (
    <section className="flex gap-2 flex-col mb-12">
      <div className="flex gap-2 ">
        <input
          name="url"
          ref={urlRef}
          onChange={theresAVideo}
          type="text"
          placeholder="https://youtube.com/watch?v=..."
          className="flex-1 px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg
             text-neutral-100 placeholder-neutral-600 text-sm
             focus:outline-none focus:border-neutral-600 transition-colors"
        />
        <button
          type="button"
          className="px-5 py-2.5 bg-neutral-100 text-neutral-900 text-sm font-medium
             rounded-lg hover:bg-neutral-300 disabled:opacity-50
             transition-colors"
          onClick={() => setIsOpenVideoArrayModal(true)}
        >
          Array of Videos
        </button>
        <button
          onClick={onSubmitVideoUrl}
          type="button"
          disabled={loading}
          className="px-5 py-2.5 bg-neutral-100 text-neutral-900 text-sm font-medium
             rounded-lg hover:bg-neutral-300 disabled:opacity-50
             transition-colors"
        >
          {loading
            ? 'Loading...'
            : `Search ${settings.settings.urls.length + (isThereAVideo ? 1 : 0)} videos`}
        </button>
      </div>
      <span className="text-center text-sm text-neutral-500">
        Tip: If you think the video/s lacks information search again and it should fix the problems
      </span>
      <span className="text-center text-sm text-neutral-500">
        Tip: If you you want to download a playlist/mix have in mind that these are pretty slow to get their data, so for faster downloads put the individual urls in the array of videos
      </span>
    </section>
  )
}
