import type { UrlObject } from 'url'

type ExtractRouteParams<T extends string> = string extends T
  ? Record<string, string>
  : T extends `${infer _Start}[${infer Param}]/${infer Rest}`
  ? { [k in Param | keyof ExtractRouteParams<Rest>]: string }
  : T extends `${infer _Start}[${infer Param}]`
  ? { [k in Param]: string }
  : {}

type DynamicRoute<Path extends string> = Omit<UrlObject, 'query'> & {
  pathname: Path
  query: ExtractRouteParams<Path>
}

export type Routes =
  | '/'
  | '/sign-up'
  | '/login'
  | '/get-started'
  | '/jobs/dao'
  | '/jobs/defi'
  | '/jobs/gaming'
  | '/jobs/nft'
  | '/companies'
  | DynamicRoute<'/[slug]'>
  | DynamicRoute<'/[slug]/[id]'>
  | '/dashboard'
  | '/dashboard/new'
  | DynamicRoute<'/dashboard/[slug]'>
  | DynamicRoute<'/dashboard/jobs/[id]'>
