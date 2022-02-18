import type { Page } from 'next'
import Image from 'next/image'

import { Link } from '~/components/link'
import { useUrlQuery } from '~/hooks/use-url-query'
import { Button } from '~/system/button'
import { Heading } from '~/system/heading'
import { Text } from '~/system/text'

import type { CompanyBySlugQuery } from './graphql/company-by-slug'
import { useCompanyBySlugQuery } from './graphql/company-by-slug'
import { useCreateCompanyAlertMutation } from './graphql/create-company-alert'
import { useViewCompany } from './hooks/use-view-company'

export interface Props {
  company: CompanyBySlugQuery['companyBySlug']
}

export const CompanyPage: Page<Props> = props => {
  // const { company } = props

  const slug = useUrlQuery('slug')

  const [{ data, error }] = useCompanyBySlugQuery({
    variables: {
      slug: slug!,
    },

    pause: !slug,
  })

  const [{ fetching }, createCompanyAlert] = useCreateCompanyAlertMutation()
  useViewCompany(props.company.id)

  const company = data?.companyBySlug ?? props.company

  const handleSubscribe = async () => {
    await createCompanyAlert({
      companyId: company.id,
    })
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex">
          {company.logoUrl && (
            <div className="flex-shrink-0 mr-4">
              <Image
                src={`https://imagedelivery.net/s8UKimEMyKeBrkJ-3SroxA/${company.logoUrl}/logo`}
                width={100}
                height={100}
                unoptimized
                className="rounded-md"
                alt="logo"
              />
            </div>
          )}
          <div className="flex justify-between">
            <div className="space-y-4">
              <Heading size={24}>{company.name}</Heading>
              <Text>{company.description}</Text>
              <Text>{company.website}</Text>
              <Text>{company.twitter}</Text>
              <Text>{company.viewCount} views</Text>
            </div>
            <div className="ml-36">
              <Button
                variant="outline"
                onPress={handleSubscribe}
                loading={fetching}
              >
                {company.subscribed ? 'Unsubscribe' : 'Subscribe'}
              </Button>
            </div>
          </div>
        </div>

        {company.jobs.map(job => (
          <Link
            key={job.id}
            href={{
              pathname: '/[slug]/[id]',
              query: {
                slug: company.slug,
                id: job.id,
              },
            }}
          >
            <a className="flex flex-col items-start justify-center p-6 border rounded-lg hover:bg-gray-2">
              <Text weight={500}>{job.position}</Text>
              <Text size={12}>Description</Text>
            </a>
          </Link>
        ))}
      </div>
    </>
  )
}
