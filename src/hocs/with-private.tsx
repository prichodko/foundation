import hoistNonReactStatics from 'hoist-non-react-statics'
import type { NextPage } from 'next'
import Head from 'next/head'

type Options = {
  redirectUrl?: string
}

export const withPrivate = <T extends {}>(
  PageComponent: NextPage<T>,
  { redirectUrl = '/login' }: Options = {}
) => {
  const WithPrivate: NextPage<T> = pageProps => {
    const code = `if (!document.cookie || document.cookie.indexOf('authorization=') === -1) {
      location.replace(
        '${redirectUrl}?next=' + encodeURIComponent(location.pathname + location.search)
      )
    }`

    return (
      <>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: code,
            }}
          />
        </Head>
        <PageComponent {...pageProps} />
      </>
    )
  }

  return hoistNonReactStatics(WithPrivate, PageComponent)
}
