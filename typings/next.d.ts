import type { NextComponentType } from 'next'

declare module 'next' {
  export type PageLayout = (page: React.ReactElement) => JSX.Element

  export type Page<P = {}, IP = P> = NextComponentType<
    NextPageContext,
    IP,
    P
  > & {
    getLayout?: PageLayout
  }
}
