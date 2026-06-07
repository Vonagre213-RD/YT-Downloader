import React, { useContext, useState } from 'react'
import { GeneralUserDataContext } from '@renderer/Contexts/GeneralUserDataContext'

interface DownloadFormatButtonProps {
  formatId: string
  url: string
  formatNote: string | undefined
  formatType: string
  filesize: number | null
}

type DownloadStatus = 'idle' | 'downloading' | 'success' | 'error'

export default function DownloadFormatButton({
  formatId,
  url,
  formatNote,
  formatType,
  filesize
}: DownloadFormatButtonProps): React.ReactNode {
  const { settings } = useContext(GeneralUserDataContext)
  const [buttonText, setButtonText] = useState<string>(`${formatNote}: FileSize: ${filesize?.toFixed(2)} MB`)
  const [downloadStatus, setDownloadStatus] = useState<DownloadStatus>('idle')

  const bgColor = downloadStatus === 'idle' ? 'bg-neutral-800' : downloadStatus === 'downloading' ? 'bg-neutral-800' : downloadStatus === 'success' ? 'bg-green-800' : 'bg-red-600'

  const handleFormatDownload = async (): Promise<void> => {
    setDownloadStatus('downloading')
    setButtonText("...Downloading");

    const data = await window.api.downloadVideo(formatId, url, settings.settings.outputPath,  formatType)

    if (!data) {
      setDownloadStatus('success')
      setButtonText("Downloaded!");
    }
    else {
      setDownloadStatus('error')
      setButtonText("Errors With the download!");
    }

    setTimeout(() => {
      setDownloadStatus('idle')
      setButtonText(`${formatNote}: FileSize: ${filesize?.toFixed(2)} MB`)
    }, 5000)

  }

  return (
    <button
      onClick={handleFormatDownload}
      className={`px-3 py-1.5 text-xs ${bgColor} text-neutral-300 rounded-md
                 hover:bg-neutral-700 hover:text-neutral-100 transition-colors`}
    >
      {buttonText}
    </button>
  )
}
