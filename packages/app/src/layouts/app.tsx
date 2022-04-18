import { UrqlProvider } from '~/components/urql'

import type { GetPageLayout, PageLayout } from 'next'

const AppLayout: PageLayout = ({ children }) => {
  return <UrqlProvider>{children}</UrqlProvider>
}

export const getPageLayout: GetPageLayout = page => (
  <AppLayout>{page}</AppLayout>
)
