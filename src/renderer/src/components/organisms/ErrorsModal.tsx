import React from 'react'
import XSymbol from '../../assets/X-Symbol.png'
import { errorType } from '@renderer/types/ReportInterface'

interface props {
  setIsOpenErrorsLogModal: React.Dispatch<React.SetStateAction<boolean>>
  isOpenErrorsLogModal: boolean
  errors: errorType[]
  
}

export default function ErrorsLogModal({
  setIsOpenErrorsLogModal,
  isOpenErrorsLogModal,
  errors
}: props): React.ReactNode {
  return (
    <>
      <div className="fixed left-12 top-0 z-50">
        <button
          className="m-2 p-2 bg-neutral-900 border border-neutral-800 rounded-lg hover:bg-neutral-800 transition-colors text-xs text-neutral-100 font-medium"
          onClick={() => setIsOpenErrorsLogModal(!isOpenErrorsLogModal)}
        >
          Errors Log
        </button>
      </div>
      <div
        className={`fixed inset-0 z-60 flex items-center justify-center bg-black/60 ${isOpenErrorsLogModal ? 'scale-100' : 'scale-0'}`}
      >
        <div className="w-full max-w-xl mx-4 bg-neutral-900 border border-neutral-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-medium text-neutral-100">Error Log</h2>
            <button
              title="close"
              onClick={() => setIsOpenErrorsLogModal(!isOpenErrorsLogModal)}
              className="p-1.5 rounded-md bg-red-700 hover:bg-red-600 transition-colors"
            >
              <img src={XSymbol} alt="close" className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {errors.map((e) => (
              <div
                key={e.message + e.target}
                className="bg-neutral-800 border border-neutral-700 rounded-lg p-3 space-y-1 text-sm"
              >
                <div className="text-neutral-100">
                  <span className="text-neutral-500">Name:</span> {e.name}
                </div>
                <div className="text-neutral-100 truncate">
                  <span className="text-neutral-500">Target:</span> {e.target}
                </div>
                <div className="text-neutral-300">
                  <span className="text-neutral-500">Message:</span> {e.message}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
