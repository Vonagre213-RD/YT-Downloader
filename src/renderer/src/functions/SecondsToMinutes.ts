export default function SecondsToMinutes(seconds: number) {
  let minutes = (seconds / 60).toFixed(0)
  let remainingSeconds = (seconds % 60).toString()

  minutes = minutes.length == 1 ? minutes.padStart(2, '0') : minutes
  remainingSeconds =
    remainingSeconds.length == 1 ? remainingSeconds.padStart(2, '0') : remainingSeconds
  return `${minutes}:${remainingSeconds}`
}
