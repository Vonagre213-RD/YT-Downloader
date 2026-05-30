import * as fs from 'fs'
import path from 'path'
import { userConfigInterface } from '../../types/userConfigInterface'
import { userConfig}  from '../Variables/userConfig'
import {app} from 'electron'

export default function LoadUserData(): void {
      const settingsFilePath = path.join(app.getPath('userData'), 'settings/settings.json')
    


    if(!fs.existsSync(settingsFilePath)){
        userConfig.settings = {
            listStart: 1,
            listEnd: 40,
            urls: [],
            outputPath: '',
            cookies: null
         }
        return
    }

    const jsonData = fs.readFileSync(settingsFilePath, { encoding: 'utf-8' })
    const parsedData: userConfigInterface = JSON.parse(jsonData)

    userConfig.settings = parsedData.settings
}