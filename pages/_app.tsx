import { IdProvider } from '@radix-ui/react-id'
import { SSRProvider } from '@react-aria/ssr'
import { useAtomValue } from 'jotai/utils'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'

import { useKeyboardShortcuts } from '~/hooks/use-keyboard-shortcuts'
import { CommandMenu, commandMenuAtom } from '~/system/command-menu'
import { DialogsProvider } from '~/system/dialogs/dialog'
import { NotificationsProvider } from '~/system/notifications'

import { darkTheme } from 'stitches.config'

// eslint-disable-next-line import/order
import '~/styles/global.css'

const App = ({ Component, pageProps }: AppProps) => {
  useKeyboardShortcuts()

  const showCommandMenu = useAtomValue(commandMenuAtom)

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      value={{
        dark: darkTheme.toString(),
        light: 'light',
      }}
      disableTransitionOnChange
    >
      <SSRProvider>
        <IdProvider>
          {showCommandMenu && <CommandMenu />}
          <Component {...pageProps} />
          <DialogsProvider />
          <NotificationsProvider />
        </IdProvider>
      </SSRProvider>
    </ThemeProvider>
  )
}

export default App
