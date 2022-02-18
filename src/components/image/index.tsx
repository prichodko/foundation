import type { ImageLoaderProps, ImageProps } from 'next/image'
import NextImage from 'next/image'

const normalizeSrc = (src: string) => {
  return src[0] === '/' ? src.slice(1) : src
}

const cloudflareLoader = ({ src, width, quality }: ImageLoaderProps) => {
  const params = [`width=${width}`]
  if (quality) {
    params.push(`quality=${quality}`)
  }
  const paramsString = params.join(',')
  return `/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}`
}

export const Image = (props: ImageProps) => {
  return <NextImage loader={cloudflareLoader} {...props} />
}
