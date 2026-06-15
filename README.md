# YT-Downloader 

![Electron](https://img.shields.io/badge/Electron-191970?style=for-the-badge&logo=Electron&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

Hi, YT-Downloader is a desktop app made with Electron, React, and TypeScript. It lets you grab YouTube videos and audio for free, in the best quality available. 

## What does it do?

- **Chosen Quality**: Grab videos in the best MP4 quality you can get.

- **Audio With data**: All the audio in `.m4a`. This format is cool because it keeps stuff like thumbnails and subtitles embedded right in the file!

- **Custom Mixes**: You can safely drop in your YouTube cookies, and the app will generate Mixes based on your very own YouTube algorithm. (Don't worry, these cookies stay on your computer and are NEVER shared with anyone else).

- **Things it uses underneath**: All the heavy lifting is handled by the open-source tools `yt-dlp` and `FFmpeg` so remember to support them!

## Compatibility

Right now, the easiest experience is on **Windows**. The app will automatically handle downloading and setting up `yt-dlp` and `FFmpeg` for you.

*Quick note: If you're on macOS or Linux, it should still work fine! You'll just need to manually install `yt-dlp` and `FFmpeg` on your machine first and use it's respective build commands downloading the source code.*

## Installation 

It's pretty simple! Just download the `yt-downloader-[app-version]-setup.exe` and just execute it and wait. And for the portable version Just download the `YT-Downloader-[app-version]-Portable.zip` from the **Releases** section, extract it, and run the executable inside named `yt-downloader.exe`. 

*Note: You might get a "Windows protected your PC" warning. Don't worry, it's just because the app is new and I don't have a developer certificate yet. If you're cautious, you're totally free to check out all the source code here and see for yourself!*

## The code:

### What you need first

Make sure you've got [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed on your machine (Also npm since Vite-Electron uses npm under it, and I recommend activating npm security options).

### Install

Grab the code and install all the necessary packages:

```bash
pnpm install
```

### Development

Wanna mess with the code or see it running? Boot up the dev server:

```bash
pnpm dev
```

## Building the App

If you want to package the app into a neat little executable, run one of these depending on your OS:

```bash
# For Windows
pnpm build:win

# For macOS
pnpm build:mac

# For Linux
pnpm build:linux
```


