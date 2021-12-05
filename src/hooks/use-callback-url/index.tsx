import { env } from '~/config/env'
import type { Routes } from '~/config/routes'

import { useUrlQuery } from '../use-url-query'

export const useCallbackUrl = (route: Routes): string => {
  return useUrlQuery('callbackUrl') ?? `${env.baseUrl}${route}`
}
