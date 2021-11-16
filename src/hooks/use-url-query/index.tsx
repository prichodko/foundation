import type { ParsedUrlQuery } from 'querystring'

import { useRouter } from 'next/router'

const getQueryParameter = (
  query: ParsedUrlQuery,
  parameter: string
): string | undefined => {
  const value = query[parameter]
  return value
    ? typeof value === 'string'
      ? value
      : value[value.length - 1]
    : undefined
}

export const useUrlQuery = (key: string): string | undefined => {
  const { query } = useRouter()

  return getQueryParameter(query, key)
}
