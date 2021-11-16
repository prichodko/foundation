import { useEffect } from 'react'

import { useViewCompanyMutation } from '../graphql/view-company'

export const useViewCompany = (companyId?: string) => {
  const [, viewCompany] = useViewCompanyMutation()

  useEffect(() => {
    if (companyId) {
      viewCompany({ id: companyId })
    }
  }, [companyId])
}
