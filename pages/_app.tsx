import { IdProvider } from '@radix-ui/react-id'
import { SSRProvider } from '@react-aria/ssr'
// import { SessionProvider } from 'next-auth/react'
// import type { PageLayout } from 'next'
import { keyframes } from '@stitches/react'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'

import { UrqlProvider } from '~/components/urql'
import { useKeyboardShortcuts } from '~/hooks/use-keyboard-shortcuts'
import { Navbar } from '~/pages/system/components/navbar'
import { styled, darkTheme } from '~/styles/config'
import '~/styles/global.css'

// eslint-disable-next-line import/order
import 'focus-visible'

const glitch = keyframes({
  '0%': {
    textShadow:
      '0.05em 0 0 rgba(255, 0, 0, 0.75), -0.05em -0.025em 0 rgba(0, 255, 0, 0.75), -0.025em 0.05em 0 rgba(0, 0, 255, 0.75)',
  },
  '14%': {
    textShadow:
      '0.05em 0 0 rgba(255, 0, 0, 0.75), -0.05em -0.025em 0 rgba(0, 255, 0, 0.75), -0.025em 0.05em 0 rgba(0, 0, 255, 0.75)',
  },
  '15%': {
    textShadow:
      '-0.05em -0.025em 0 rgba(255, 0, 0, 0.75), 0.025em 0.025em 0 rgba(0, 255, 0, 0.75), -0.05em -0.05em 0 rgba(0, 0, 255, 0.75)',
  },
  '49%': {
    textShadow:
      '-0.05em -0.025em 0 rgba(255, 0, 0, 0.75), 0.025em 0.025em 0 rgba(0, 255, 0, 0.75), -0.05em -0.05em 0 rgba(0, 0, 255, 0.75)',
  },
  '50%': {
    textShadow:
      '0.025em 0.05em 0 rgba(255, 0, 0, 0.75), 0.05em 0 0 rgba(0, 255, 0, 0.75), 0 -0.05em 0 rgba(0, 0, 255, 0.75)',
  },
  '99%': {
    textShadow:
      '0.025em 0.05em 0 rgba(255, 0, 0, 0.75), 0.05em 0 0 rgba(0, 255, 0, 0.75), 0 -0.05em 0 rgba(0, 0, 255, 0.75)',
  },
  '100%': {
    textShadow:
      '-0.025em 0 0 rgba(255, 0, 0, 0.75), -0.025em -0.025em 0 rgba(0, 255, 0, 0.75), -0.025em -0.05em 0 rgba(0, 0, 255, 0.75)',
  },
})

const Glitch = styled('h1', {
  color: 'white',
  fontSize: '8rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  position: 'relative',
  textShadow:
    '0.05em 0 0 rgba(255, 0, 0, 0.75), -0.025em -0.05em 0 rgba(0, 255, 0, 0.75), 0.025em 0.05em 0 rgba(0, 0, 255, 0.75)',
  animation: `${glitch} 500ms infinite`,

  span: {
    position: 'absolute',
    top: '0',
    left: '0',
  },

  'span:first-child': {
    animation: `${glitch} 650ms infinite`,
    clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
    transform: 'translate(-0.025em, -0.0125em)',
    opacity: 0.8,
  },

  'span:last-child': {
    animation: `${glitch} 375ms infinite`,
    clipPath: 'polygon(0 80%, 100% 20%, 100% 100%, 0 100%)',
    transform: 'translate(0.0125em, 0.025em)',
    opacity: 0.8,
  },
})

const ComingSoon = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-12">
      <Glitch>
        <span aria-hidden="true">COMING SOON</span>
        COMING SOON
        <span aria-hidden="true">COMING SOON</span>
      </Glitch>
    </div>
  )
}
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

  return <ComingSoon />

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
        <UrqlProvider>
          <IdProvider>
            <div>
              <Navbar />
              <div>
                <div className="max-w-5xl min-h-screen px-12 py-24 mx-auto">
                  <Component {...pageProps} />
                </div>
              </div>
            </div>
          </IdProvider>
        </UrqlProvider>
      </SSRProvider>
    </ThemeProvider>
  )
}

export default App
