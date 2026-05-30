//images
import burgerMenu from '../../assets/burger-menu.png'
//react
import { useState, useContext } from 'react'
//Components
import { GeneralUserDataContext } from '../../Contexts/GeneralUserDataContext'
import { FullReportData } from '@renderer/types/mediaCompactedData'
//data

interface props{
  fullReportData: FullReportData
  setFullReportData: React.Dispatch<React.SetStateAction<FullReportData>>
}
export default function BurgerMenu({setFullReportData, fullReportData} : props): React.ReactNode {
  const { settings, setSettings } = useContext(GeneralUserDataContext)
  const [isBurgetMenuIsOpen, setIsOpenBurgerMenu] = useState<boolean>(false)

  const cookiesAreEmpty = (cookies: unknown): boolean => {
    if (cookies == null) return true
    if (typeof cookies === 'object' && Object.keys(cookies).length === 0) return true
    return false
  }

  const saveChanges = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const { listStart, listEnd, Cookies } = Object.fromEntries(formData)

    const newCookies =
      Cookies instanceof File && Cookies.size > 0
        ? await getBuffer(Cookies)
        : settings.settings.cookies

    const newSettings = {
      settings: {
        ...settings.settings,
        listStart: Number(listStart) <= 0 ? 1 : Number(listStart),
        listEnd: detectListEnd(listEnd) as number | string,
        cookies: newCookies
      }
    }
    setSettings(newSettings)
    const errors = window.api.saveUserSettings(newSettings)

    const newReport = {...fullReportData, errors: [...fullReportData.errors, ...errors]}
    setFullReportData(newReport)
  }

  const getBuffer = async (file: File): Promise<Uint8Array<ArrayBuffer>> => {
    const arrayBuffer = await (file as File).arrayBuffer()
    const ArrayBufferView = await new Uint8Array(arrayBuffer)

    return ArrayBufferView
  }

  const detectListEnd = (value: string | object): number | (string | object) => {
    if (value.valueOf().toString().toLowerCase().trim() == 'all') {
      return value
    } else {
      return Number(value.valueOf().toString())
    }
  }

  const getDirectoryPath = async (): Promise<void> => {
    const data = await window.api.dialogOpenDirectory()
    setSettings({ settings: { ...settings.settings, outputPath: data } })
  }

  return (
    <div className="fixed left-0 top-0 z-50">
      <button
        onClick={() => setIsOpenBurgerMenu(!isBurgetMenuIsOpen)}
        className="m-2 p-2 bg-neutral-900 border border-neutral-800 rounded-lg hover:bg-neutral-800 transition-colors"
        title="open/close"
      >
        <img src={burgerMenu} title="burgerMenuImg" className="w-5 h-5" />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${isBurgetMenuIsOpen ? 'max-w-60' : 'max-w-0 whitespace-nowrap truncate'}`}
      >
        <form
          onSubmit={saveChanges}
          className="m-2 p-3 bg-neutral-900 border border-neutral-800 rounded-lg space-y-3"
        >
          <details className="text-sm text-neutral-300">
            <summary className="cursor-pointer text-neutral-100 font-medium">
              playlists/Mix options
            </summary>
            <div className="mt-2 space-y-2">
              <input
                type="number"
                title="listStart"
                name="listStart"
                placeholder="Start"
                defaultValue={settings.settings.listStart}
                className="w-full px-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded-md text-xs text-neutral-100"
              />
              <p className="text-xs text-neutral-500">
                write all if you want to download all the videos
              </p>
              <p className="text-xs text-neutral-500">
                Important! For mixes you must write an end since these are &quot;infinite&quot; the
                program would crash
              </p>
              <input
                type="text"
                title="listEnd"
                name="listEnd"
                placeholder="End"
                defaultValue={settings.settings.listEnd}
                className="w-full px-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded-md text-xs text-neutral-100"
              />
            </div>
          </details>
          <details className="text-sm text-neutral-300">
            <summary className="cursor-pointer text-neutral-100 font-medium">user option</summary>
            <span className="text-xs text-neutral-500">we do not share your cookies with anyone!</span>
            <div className="mt-2">
              <input
                type="file"
                title="Cookies"
                name="Cookies"
                className="text-xs text-neutral-500"
              />
              <span className={`text-xs ${cookiesAreEmpty(settings.settings.cookies) ? 'text-red-500' : 'text-green-500'}`}>
                {cookiesAreEmpty(settings.settings.cookies) ? 'cookies are not set' : 'Cookies are set!'}</span>
            </div>
          </details>
          <details className="text-sm text-neutral-300">
            <summary className="cursor-pointer text-neutral-100 font-medium">output path</summary>
            <div className="mt-2">
              <button
                type="button"
                onClick={getDirectoryPath}
                title="outputPath"
                name="outputPath"
                className="w-full px-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded-md text-xs text-neutral-100"
              >{settings.settings.outputPath}</button>
            </div>
          </details>
          <button
            type="submit"
            className="w-full px-3 py-1.5 bg-neutral-100 text-neutral-900 text-xs font-medium rounded-md hover:bg-neutral-300 transition-colors"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  )
}
