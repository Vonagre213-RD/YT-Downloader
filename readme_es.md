# YT-Downloader 🎥🎵

![Electron](https://img.shields.io/badge/Electron-191970?style=for-the-badge&logo=Electron&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

¡Hola! YT-Downloader es una aplicación de escritorio creada con Electron, React y TypeScript. Te permite descargar videos y audio de YouTube gratis, en la mejor calidad disponible.

## ¿Qué hace?

- **Calidad a tu gusto**: Descarga videos en la mejor calidad MP4 que puedas conseguir.

- **Audio con datos**: Todo el audio en `.m4a`. ¡Este formato es genial porque mantiene cosas como miniaturas y subtítulos incrustados directamente en el archivo!

- **Mixes personalizados**: Puedes poner tus cookies de YouTube de forma segura y la aplicación generará Mixes basados en tu propio algoritmo de YouTube. (No te preocupes, estas cookies se quedan en tu computadora y NUNCA se comparten con nadie más).

- **Bajo el capó**: Todo el trabajo pesado lo manejan las herramientas de código abierto `yt-dlp` y `FFmpeg`, ¡así que recuerda apoyarlos!

## Compatibilidad

Ahora mismo, la experiencia más fácil es en **Windows**. La aplicación se encargará automáticamente de descargar y configurar `yt-dlp` y `FFmpeg` por ti.

*Nota rápida: Si usas macOS o Linux, ¡debería funcionar bien! Solo tendrás que instalar manualmente `yt-dlp` y `FFmpeg` en tu máquina primero.*

## Instalación 

¡Es bastante simple! Solo descarga el archivo `yt-Downloader-App.zip` desde la sección de **Releases** (Lanzamientos), extráelo y ejecuta el instalador que está adentro llamado `yt-downloader-[app-version]-setup.exe`. 

*Nota: Puede que te salga una advertencia de "Windows protegió su PC". No te preocupes, no es un virus, es solo porque la aplicación es nueva y aún no tengo un certificado de desarrollador. De todos modos, si eres precavido, ¡eres totalmente libre de revisar todo el código fuente aquí y verlo por ti mismo!*

## El código:

### Qué necesitas primero

Asegúrate de tener [Node.js](https://nodejs.org/) y [pnpm](https://pnpm.io/) instalados en tu máquina (También npm, ya que Vite-Electron usa npm por debajo, y recomiendo activar las opciones de seguridad de npm).

### Instalar

Descarga el código e instala todos los paquetes necesarios:

```bash
pnpm install
```

### Desarrollo

¿Quieres jugar con el código o verlo funcionar? Arranca el servidor de desarrollo:

```bash
pnpm dev
```

## 🛠️ Compilando la App

Si quieres empaquetar la aplicación en un ejecutable listo para usar, corre uno de estos comandos dependiendo de tu sistema operativo:

```bash
# Para Windows
pnpm build:win

# Para macOS
pnpm build:mac

# Para Linux
pnpm build:linux
```
