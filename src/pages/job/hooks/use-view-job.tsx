import { useEffect } from 'react'

import { useViewJobMutation } from '../graphql/view-job'

export const useViewJob = (jobId?: string) => {
  const [, viewJob] = useViewJobMutation()

  useEffect(() => {
    if (jobId) {
      viewJob({ id: jobId })
    }
  }, [jobId])
}
