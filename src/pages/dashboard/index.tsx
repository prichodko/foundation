import type { Page } from 'next'

import { useUrlQuery } from '~/hooks/use-url-query'
import { Button } from '~/system/button'
import { Heading } from '~/system/heading'
import { Text } from '~/system/text'

import { Company } from './components/company'
import { LikedJobs } from './components/liked-jobs'
import { PostedJobs } from './components/posted-jobs'
import { useCheckoutSessionQuery } from './graphql/checkout-session'
import { useCreateBillingPortalSessionMutation } from './graphql/create-billing-portal-session'
import { useUserQuery } from './graphql/user'

interface Props {}

export const Dashboard: Page = (props: Props) => {
  const {} = props

  const sessionId = useUrlQuery('session_id')

  const [{ data }] = useUserQuery({})
  const [result, createBillingPortalSession] =
    useCreateBillingPortalSessionMutation()

  const [{ data: checkoutSession }] = useCheckoutSessionQuery({
    variables: {
      id: sessionId!,
    },
    pause: !sessionId,
  })

  console.log(checkoutSession)

  if (!data) {
    return <div>loading...</div>
  }

  const handleBilling = async () => {
    const { data, error } = await createBillingPortalSession()

    if (error) {
      console.error(error)
    }

    window.location.assign(data!.createBillingPortalSession.url)
  }

  const { company, jobs, likes, email, name } = data.user

  return (
    <>
      <div className="space-y-10">
        <div>
          <div className="flex justify-between">
            <Heading size={24} className="mb-4">
              {name}
            </Heading>
            <div>
              <div className="grid grid-flow-col gap-2">
                <Button onPress={handleBilling} loading={result.fetching}>
                  Buy
                </Button>
                <Button onPress={handleBilling} loading={result.fetching}>
                  Billing
                </Button>
              </div>
            </div>
          </div>
          <Text weight={500}>{email}</Text>
        </div>
        <div>
          <Heading size={24} className="mb-4">
            Your Jobs
          </Heading>
          <PostedJobs jobs={jobs} />
        </div>
        <div>
          <Heading size={24} className="mb-4">
            Your Company
          </Heading>
          <Company company={company} />
        </div>
        <div>
          <Heading size={24} className="mb-4">
            Your Likes
          </Heading>
          <LikedJobs likes={likes} />
        </div>
      </div>
    </>
  )
}
