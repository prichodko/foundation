import '~/styles/global.css'

import { darkTheme } from '@example/system'
import { IdProvider } from '@radix-ui/react-id'
import { ThemeProvider } from 'next-themes'

import { useKeyboardShortcuts } from '~/hooks/use-keyboard-shortcuts'

import type { GetPageLayout, Page } from 'next'
import type { AppProps } from 'next/app'

interface Props extends AppProps {
  Component: Page
}

const App = ({ Component, pageProps }: Props) => {
  useKeyboardShortcuts()

  const getLayout: GetPageLayout = Component.getLayout ?? (page => page)

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
      <IdProvider>{getLayout(<Component {...pageProps} />)}</IdProvider>
    </ThemeProvider>
  )
}

export default App
