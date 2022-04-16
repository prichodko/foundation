import '~/styles/global.css'

import { darkTheme } from '@example/system'
import { IdProvider } from '@radix-ui/react-id'
import { ThemeProvider } from 'next-themes'

import { useKeyboardShortcuts } from '~/hooks/use-keyboard-shortcuts'

import type { AppProps } from 'next/app'

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
      <IdProvider>
        <Component {...pageProps} />
      </IdProvider>
    </ThemeProvider>
  )
}

export default App
