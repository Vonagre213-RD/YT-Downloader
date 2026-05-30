export interface userConfigInterface {
  settings: {
    listStart: number
    listEnd: number | string
    cookies: Uint8Array<ArrayBuffer> | null
    urls: string[]
    outputPath: string
  }
}

export interface userConfigStateInterface {
  settings: userConfigInterface
  setSettings: React.Dispatch<React.SetStateAction<userConfigInterface>>
}
