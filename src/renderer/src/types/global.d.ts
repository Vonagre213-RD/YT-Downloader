declare global {
  interface File {
    arrayBuffer(): Promise<ArrayBuffer>
    bytes(): Promise<Uint8Array<ArrayBuffer>>
  }
}
