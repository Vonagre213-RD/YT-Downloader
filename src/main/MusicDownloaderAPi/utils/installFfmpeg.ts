/* eslint-disable @typescript-eslint/no-explicit-any */
import { errorType } from '../types/ReportInterface'
import * as fs from 'fs'
import path from 'path';
import { app } from 'electron';
import unzipper from 'unzipper'
import { spawn } from 'child_process';

export async function installFfmpeg(): Promise<{ success: boolean; errors: errorType[] }> {
  try {
    const ffmpegFolderPath = path.join(app.getPath('userData'), 'bin/ffmpeg/')

    const data = spawn('winget', ['download', 'Gyan.FFmpeg', '--download-directory', `${ffmpegFolderPath}`, '--accept-source-agreements', '--accept-package-agreements'], { shell: true })

    await new Promise<void>((resolve, reject) => {
      data.on('error', (err) => reject(err))

      data.stdout.on('close', async () => {
        try {
          const files = fs.readdirSync(ffmpegFolderPath, { withFileTypes: true })
          let zipFilePath = ''
          for (let file of files) {
            if (file.isFile()) {
              if (path.extname(file.name) === '.zip' && file.name.includes('FFmpeg')) {
                zipFilePath = path.join(ffmpegFolderPath, file.name);
                break
              }
            }
          }

          await uncompressFile(zipFilePath, ffmpegFolderPath)
          await extractBinaries(ffmpegFolderPath)
          await deleteOldBins(ffmpegFolderPath);

          resolve()
        } catch (err) {
          reject(err)
        }
      })
    })

    return { success: true, errors: [] }

  } catch (err) {
    return {
      success: false,
      errors: [
        {
          name: 'installFfmpegError',
          message: err instanceof Error ? err.message : String(err),
          target: 'ffmpeg'
        }
      ]
    }
  }
}

async function uncompressFile(filePath: string, destPath: string) {

  const readStream = fs.createReadStream(filePath);

  await new Promise<void>((resolve, eject) => {
    readStream.pipe(unzipper.Extract({ path: destPath }))
      .on('close', () => {
        resolve()
      })
      .on('error', (err) => {
        eject(err)
      })
  })


}

async function extractBinaries(folderPath: string) {
  const files = fs.readdirSync(folderPath, { withFileTypes: true })

  let binariesPath = ''
  for (let file of files) {
    if (file.isDirectory()) {

      binariesPath = path.join(folderPath, file.name, 'bin');

    }
  };

  const binaries = fs.readdirSync(binariesPath, { withFileTypes: true })

  for (let binary of binaries) {

    let binaryPath = path.join(binariesPath, binary.name)
    fs.renameSync(binaryPath, path.join(folderPath, binary.name))
  }

}


async function deleteOldBins(folderPath: string) {

  const files = fs.readdirSync(folderPath, { withFileTypes: true })

  for (let file of files) {

    const filePath = path.join(folderPath, file.name)
    if (!(path.extname(filePath) === '.exe')) {
      fs.rmSync(filePath, { recursive: true })


    }
  }
}
