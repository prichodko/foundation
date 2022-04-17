import type { GetPageLayout, PageLayout } from 'next'

const AppLayout: PageLayout = ({ children }) => {
  return <div>{children}</div>
}

export const getPageLayout: GetPageLayout = page => (
  <AppLayout>{page}</AppLayout>
)
