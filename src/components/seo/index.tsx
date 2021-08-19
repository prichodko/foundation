import Head from 'next/head'

interface Props {
  title: string
  description: string
  imageSrc?: string
}

export const SEO = (props: Props) => {
  const { title, description, imageSrc } = props

  return (
    <Head>
      <title>{title}</title>
      <meta property="og:site_name" content={title} />
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://example.com" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {imageSrc && <meta property="og:image" content={imageSrc} />}

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://example.com" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      {imageSrc && <meta property="twitter:image" content={imageSrc} />}
    </Head>
  )
}
