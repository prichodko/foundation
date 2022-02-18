import { IdProvider } from '@radix-ui/react-id'
import { SSRProvider } from '@react-aria/ssr'
import type { PageLayout } from 'next'
import { SessionProvider } from 'next-auth/react'
// import type { PageLayout } from 'next'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'

import { UrqlProvider } from '~/components/urql'
import { useKeyboardShortcuts } from '~/hooks/use-keyboard-shortcuts'
import { Navbar } from '~/pages/system/components/navbar'
import { darkTheme } from '~/styles/config'
import '~/styles/global.css'

// eslint-disable-next-line import/order
import 'focus-visible'

// const layout: PageLayout = page => {
//   return (
//     <div>
//       <Navbar />
//       <div>
//         <div className="max-w-5xl min-h-screen px-12 py-24 mx-auto">{page}</div>
//       </div>
//       {/* <div className="max-w-2xl mx-auto tracking-wide">{page}</div> */}

//       {/* <div>
//         <a>Twitter</a>
//         <a>Discord</a>
//         <a>FAQ</a>
//         <a>Support</a>
//         <a>Terms</a>
//         <a>Privacy</a>
//       </div> */}
//   )
// }

const App = ({ Component, pageProps }: AppProps) => {
  useKeyboardShortcuts()

  // @ts-ignore
  const layout: PageLayout = Component.getLayout ?? (page => page)

  console.log(pageProps)

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      value={{
        light: 'light',
        dark: darkTheme.toString(),
      }}
      disableTransitionOnChange
    >
      <SSRProvider>
        <UrqlProvider initialState={pageProps.cache}>
          <IdProvider>
            <SessionProvider session={pageProps.session}>
              <div>
                <Navbar />
                <div className="max-w-5xl min-h-screen px-12 py-24 mx-auto">
                  {layout(<Component {...pageProps} />)}
                </div>
              </div>
            </SessionProvider>
          </IdProvider>
        </UrqlProvider>
      </SSRProvider>
    </ThemeProvider>
  )
}

export default App
