import { AppProps } from 'next/app'
import '~/styles/global.css'

// import { SSRProvider } from '@react-aria/ssr'
import { IdProvider } from '@radix-ui/react-id'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <IdProvider>
      <Component {...pageProps} />
    </IdProvider>
  )
}

export default App
