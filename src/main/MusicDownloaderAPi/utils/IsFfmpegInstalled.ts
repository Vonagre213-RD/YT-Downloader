import * as fs from 'fs'
import path from 'path'
import { app } from 'electron'
import { spawnSync } from 'child_process'

export function IsFfmpegInstalled(): boolean {


  const ffmpegIsInSystemPath = spawnSync("ffmpeg", ["-version"], {
    shell: true
  })

  if (ffmpegIsInSystemPath.status == 0) {

    return true
  }

  return AreFfmpegBinariesInstaled()
}

export function AreFfmpegBinariesInstaled(): boolean {
  const ffmgpegFilePath = path.join(app.getPath('userData'), 'bin/ffmpeg/')

  const isFfmpegThere = fs.existsSync(path.join(ffmgpegFilePath, 'ffmpeg.exe'));
  const isFfplayThere = fs.existsSync(path.join(ffmgpegFilePath, 'ffplay.exe'));
  const isFfprobeThere = fs.existsSync(path.join(ffmgpegFilePath, 'ffprobe.exe'))

  return isFfmpegThere && isFfplayThere && isFfprobeThere
}

