import { createContext, useState } from 'react'
import type { userConfigInterface, userConfigStateInterface } from '../types/userConfigInterface'

const baseValue = {
  settings: {
    listStart: 0,
    listEnd: 40,
    cookies: null,
    urls: [],
    outputPath: './out/output'
  }
}

const GeneralUserDataContext = createContext<userConfigStateInterface>({
  settings: baseValue,
  setSettings: () => {}
})

function GeneralUserDataContextProvider({
  children
}: {
  children: React.ReactNode
}): React.ReactNode {
  const [settings, setSettings] = useState<userConfigInterface>(baseValue)
  return (
    <GeneralUserDataContext value={{ settings, setSettings }}>{children}</GeneralUserDataContext>
  )
}

export { GeneralUserDataContext, GeneralUserDataContextProvider }
