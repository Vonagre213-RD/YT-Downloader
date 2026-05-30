import React, { useContext } from 'react'
import { GeneralUserDataContext } from '../../Contexts/GeneralUserDataContext'
import XSymbol from '../../assets/X-Symbol.png'
import { useRef } from 'react'

interface props {
  setIsOpenVideoArrayModal: React.Dispatch<React.SetStateAction<boolean>>
  isOpenVideoArrayModal: boolean
}

export default function VideoArrayModal({
  setIsOpenVideoArrayModal,
  isOpenVideoArrayModal
}: props): React.ReactNode {
  const inputRef = useRef<null | HTMLInputElement>(null)
  const { settings, setSettings } = useContext(GeneralUserDataContext)

  const addUrl = (): void => {
    if (!inputRef.current?.value) {
      return
    }
    const newUrls = [...settings.settings.urls, inputRef.current!.value]

    const newSettings = {
      settings: {
        ...settings.settings,
        urls: newUrls
      }
    }
    setSettings(newSettings)
  }

  const clearUrls = (): void => {
    const newSettings = {
      settings: {
        ...settings.settings,
        urls: []
      }
    }
    setSettings(newSettings)
  }
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 ${isOpenVideoArrayModal ? 'scale-100' : 'scale-0'}`}
    >
      <div className="w-full max-w-xl mx-4 bg-neutral-900 border border-neutral-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-medium text-neutral-100">Array of Videos</h2>
          <button
            title="close"
            onClick={() => setIsOpenVideoArrayModal(!isOpenVideoArrayModal)}
            className="p-1.5 rounded-md bg-red-700 hover:bg-red-600 transition-colors"
          >
            <img src={XSymbol} alt="close" className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              placeholder="https://youtube.com/watch?v=..."
              className="flex-1 px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-sm text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-neutral-600 transition-colors"
            />
            <button
              onClick={addUrl}
              className="px-4 py-2 bg-neutral-100 text-neutral-900 text-sm font-medium rounded-md hover:bg-neutral-300 transition-colors"
            >
              Add
            </button>
            <button
              onClick={clearUrls}
              className="px-4 py-2 bg-red-700 text-neutral-100 text-sm font-medium rounded-md hover:bg-red-600 transition-colors"
            >
              Clear
            </button>
          </div>
          {settings.settings.urls.length > 0 && (
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {settings.settings.urls.map((u, i) => (
                <div
                  key={i}
                  className="px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-md text-sm text-neutral-300 truncate"
                >
                  {u}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
