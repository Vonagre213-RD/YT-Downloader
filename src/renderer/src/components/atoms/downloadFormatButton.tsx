import React, { useContext, useState } from 'react'
import { GeneralUserDataContext } from '@renderer/Contexts/GeneralUserDataContext'

interface DownloadFormatButtonProps {
  formatId: string
  url: string
  formatNote: string | undefined
  filesize: number | null
}

export default function DownloadFormatButton({
  formatId,
  url,
  formatNote,
  filesize
}: DownloadFormatButtonProps): React.ReactNode {
  const { settings } = useContext(GeneralUserDataContext)
  const [buttonText, setButtonText] = useState<string>(`${formatNote}: FileSize: ${filesize?.toFixed(2)} MB`)



  const handleFormatDownload = async (): Promise<void> => {
    setButtonText("...Downloading");

    const data = await window.api.downloadVideo(formatId, url, settings.settings.outputPath)

    if (!data) {
      setButtonText("Downloaded!");
    }
    else {
      setButtonText("Errors With the download!");
    }

    setTimeout(() => {
      setButtonText(`${formatNote}: FileSize: ${filesize?.toFixed(2)} MB`)
    }, 5000)

  }

  return (
    <button
      onClick={handleFormatDownload}
      className={`px-3 py-1.5 text-xs ${buttonText == `${formatNote}: FileSize: ${filesize?.toFixed(2)} MB` ? 'bg-neutral-800' : buttonText == 'Downloaded!' ? 'bg-green-800' : 'bg-red-600'}  text-neutral-300 rounded-md
                 hover:bg-neutral-700 hover:text-neutral-100 transition-colors`}
    >
      {buttonText}
    </button>
  )
}
