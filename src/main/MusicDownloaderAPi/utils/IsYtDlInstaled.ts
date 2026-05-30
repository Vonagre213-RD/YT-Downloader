import * as fs from 'fs'
import path from 'path'
import { app } from 'electron'

export function IsYtDlInstaled(): boolean {

    return fs.existsSync(path.join(app.getPath('userData'), 'bin/yt-dlp.exe'))
}