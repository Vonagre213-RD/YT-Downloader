export default function UrlIsPlayList(url: string): boolean {
  return url.includes('&list=')
}
