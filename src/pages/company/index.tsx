import type { Page } from 'next'
import Error from 'next/error'

import { Link } from '~/components/link'
import { useUrlQuery } from '~/hooks/use-url-query'
import { Button } from '~/system/button'
import { Heading } from '~/system/heading'
import { Text } from '~/system/text'

import { useCompanyBySlugQuery } from './graphql/company-by-slug'
import { useViewCompany } from './hooks/use-view-company'

interface Props {}

export const Company: Page = (props: Props) => {
  const {} = props

  const slug = useUrlQuery('slug')

  const [{ data, error }] = useCompanyBySlugQuery({
    variables: {
      slug: slug!,
    },
    pause: !slug,
  })
  useViewCompany(data?.companyBySlug.id)

  if (error) {
    return <Error statusCode={404} />
  }

  if (!data) {
    return <div>Loading...</div>
  }

  const company = data.companyBySlug

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between">
          <div className="space-y-4">
            <Heading size={24}>{company.name}</Heading>
            <Text>{company.description}</Text>
            <Text>{company.website}</Text>
            <Text>{company.twitter}</Text>
            <Text>{company.viewCount} views</Text>
          </div>
          <div className="ml-36">
            <Button variant="outline">Subscribe</Button>
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
