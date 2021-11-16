import type { Page } from 'next'

import { Link } from '~/components/link'
import { Heading } from '~/system/heading'
import { Text } from '~/system/text'

import { useCompaniesQuery } from './graphql/companies'

interface Props {}

export const Companies: Page = (props: Props) => {
  const {} = props

  const [{ data }] = useCompaniesQuery()

  return (
    <div className="space-y-10">
      <Heading className="mr-10">Companies</Heading>

      {data?.companies.map(company => (
        <Link
          key={company.id}
          href={{
            pathname: '/[slug]',
            query: { slug: company.slug },
          }}
        >
          <a className="flex items-center p-5 border rounded-lg hover:bg-gray-2">
            <Text weight={600}>{company.name}</Text>
            <Text>{company.twitter}</Text>
            <Text>{company.website}</Text>
          </a>
        </Link>
      ))}
    </div>
  )
}
