import { IdProvider } from '@radix-ui/react-id'
import { SSRProvider } from '@react-aria/ssr'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'

import { UrqlProvider } from '~/components/urql'
import { useKeyboardShortcuts } from '~/hooks/use-keyboard-shortcuts'
import { darkTheme } from '~/styles/config'
import '~/styles/global.css'

// eslint-disable-next-line import/order
import 'focus-visible'

const App = ({ Component, pageProps }: AppProps) => {
  useKeyboardShortcuts()

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
        <IdProvider>
          <UrqlProvider>
            <Component {...pageProps} />
          </UrqlProvider>
        </IdProvider>
      </SSRProvider>
    </ThemeProvider>
  )
}

export default App
