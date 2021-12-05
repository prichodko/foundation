import { useEffect } from 'react'

import type { Page } from 'next'

import { useUrlQuery } from '~/hooks/use-url-query'
import { globalCss } from '~/styles/config'
import { Button } from '~/system/button'
import { Heading } from '~/system/heading'

import { Account } from './components/account'
import { Company } from './components/company'
import { JobAlerts } from './components/job-alerts'
import { LikedJobs } from './components/liked-jobs'
import { PostedJobs } from './components/posted-jobs'
import { useCheckoutSessionQuery } from './graphql/checkout-session'
import { useCreateBillingPortalSessionMutation } from './graphql/create-billing-portal-session'
import { useUserQuery } from './graphql/user'

interface Props {}

const globalStyles = globalCss({
  body: {
    overscrollBehavior: 'none',
  },
})

export const Dashboard: Page = (props: Props) => {
  const {} = props

  globalStyles()
  const sessionId = useUrlQuery('session_id')

  const [{ data }] = useUserQuery({
    variables: {},
    requestPolicy: 'cache-and-network',
  })
  const [result, createBillingPortalSession] =
    useCreateBillingPortalSessionMutation()

  const [{ data: checkoutSession }] = useCheckoutSessionQuery({
    variables: {
      id: sessionId!,
    },
    pause: !sessionId,
  })

  useEffect(() => {
    if (checkoutSession) {
      console.log(checkoutSession)
    }
  }, [checkoutSession])

  if (!data) {
    return null
  }

  const handleBilling = async () => {
    const { data, error } = await createBillingPortalSession()

    if (error) {
      console.error(error)
    }

    window.location.assign(data!.createBillingPortalSession.url)
  }

  const { company, jobs, likes, alerts } = data.user

  return (
    <>
      <div className="space-y-20">
        <div>
          <Heading size={24} className="mb-4">
            Account
          </Heading>
          <Account user={data.user} />
        </div>

        <div>
          <Heading size={24} className="mb-4">
            Your Company
          </Heading>
          <Company company={company} />
        </div>

        <div>
          <div className="flex justify-between">
            <Heading size={24} className="mb-4">
              Your Jobs
            </Heading>
            <div>
              <div className="grid grid-flow-col gap-2">
                <Button onPress={handleBilling}>Buy</Button>
                <Button onPress={handleBilling} loading={result.fetching}>
                  Billing
                </Button>
              </div>
            </div>
          </div>
          <PostedJobs jobs={jobs} />
        </div>

        <div>
          <Heading size={24} className="mb-4">
            Your Likes
          </Heading>
          <LikedJobs likes={likes} />
        </div>

        <div>
          <Heading size={24} className="mb-4">
            Your Alerts
          </Heading>
          <JobAlerts alerts={alerts} />
        </div>
      </div>
    </>
  )
}
