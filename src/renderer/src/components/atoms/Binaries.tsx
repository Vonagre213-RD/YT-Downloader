import { useEffect, useState } from 'react'
import type { FullReportData } from '../../types/mediaCompactedData'

interface BinariesProps {
  setFullReportData: React.Dispatch<React.SetStateAction<FullReportData>>
  setIsOpenErrorsLogModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Binaries({
  setFullReportData,
  setIsOpenErrorsLogModal
}: BinariesProps): React.ReactNode {
  const [isYtDlpInstalled, setIsYtDlpInstalled] = useState<boolean | null>(null)
  const [isFfmpegInstalled, setIsFfmpegInstalled] = useState<boolean | null>(null)
  const [isYtDlpDownLoading, setIsYtDlpDownLoading] = useState<boolean>(false)

  const [isFfmpegDownLoading, setIsFfmpegDownLoading] = useState<boolean>(false)

  useEffect(() => {

    const checkBinaries = async (): Promise<void> => {
      const [ytDlpResult, ffmpegResult] = await Promise.all([
        window.api.isYtDlpInstalled(),
        window.api.isFfmpegInstalled()
      ])
      setIsYtDlpInstalled(ytDlpResult)
      setIsFfmpegInstalled(ffmpegResult)
    }

    checkBinaries()
  }, [])

  const handleInstallYtDlp = async (): Promise<void> => {
    setIsYtDlpDownLoading(true)
    const data = await window.api.installYtDlp()
    
    setIsYtDlpDownLoading(false)
    setIsYtDlpInstalled(data.success)
    if (data.errors.length > 0) {
      setFullReportData((prev) => ({ ...prev, errors: [...prev.errors, ...data.errors] }))
      setIsOpenErrorsLogModal(true)
    }

  }

  const handleInstallFfmpeg = async (): Promise<void> => {
    setIsFfmpegDownLoading(true)

    const data = await window.api.installFfmpeg()
    setIsFfmpegDownLoading(false)
    setIsFfmpegInstalled(data.success)

    if (data.errors.length > 0) {
      setFullReportData((prev) => ({ ...prev, errors: [...prev.errors, ...data.errors] }))
      setIsOpenErrorsLogModal(true)
    }
  }

  return (
    <div className="absolute top-4 right-4 flex flex-col gap-2">
      <button
        onClick={handleInstallYtDlp}
        className="px-4 py-2 text-sm bg-neutral-800 text-neutral-300 rounded-md hover:bg-neutral-700 hover:text-neutral-100 transition-colors"
      >
        {isYtDlpInstalled === null ? 'Checking yt-dlp...' : isYtDlpDownLoading ? '...downloading' : isYtDlpInstalled ? 'yt-dlp Installed' : 'yt-dlp Missing - click to download'}
      </button>
      <button
        onClick={handleInstallFfmpeg}
        className="px-4 py-2 text-sm bg-neutral-800 text-neutral-300 rounded-md hover:bg-neutral-700 hover:text-neutral-100 transition-colors"
      >
        {isFfmpegInstalled === null ? 'Checking ffmpeg...' : isFfmpegDownLoading ? "...downloading": isFfmpegInstalled ? 'ffmpeg Installed' : 'ffmpeg Missing - click to download'}
      </button>
    </div>
  )
}
