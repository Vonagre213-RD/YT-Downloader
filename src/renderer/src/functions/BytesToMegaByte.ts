export default function BytesToMegaByte(Bytes: number | null) {
  if (Bytes == null) {
    return null
  }
  return Bytes / 1028 ** 2
}
