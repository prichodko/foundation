import type { NextPage } from 'next'
import type * as React from 'react'

type AnyObject = Record<string, unknown>

declare module 'next' {
  export type PageLayout<P = { children: React.ReactNode }> = (
    props: P
  ) => React.ReactElement

  export type GetPageLayout<P = EmptyObject> = (
    page: React.ReactElement<P>
  ) => React.ReactNode

  export type Page = NextPage & {
    getLayout?: GetPageLayout
  }
}
