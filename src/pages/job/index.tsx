// import { generateHTML } from '@tiptap/core'
// import StarterKit from '@tiptap/starter-kit'
import type { Page } from 'next'
import { gql, useQuery } from 'urql'

import { JobLike } from '~/components/job-like'
import { Link } from '~/components/link'
import { Tag } from '~/components/tag'
import { useUrlQuery } from '~/hooks/use-url-query'
// import { styled, theme } from '~/styles/config'
import { Button } from '~/system/button'
import { Heading } from '~/system/heading'
import { Text } from '~/system/text'

import { ShareButtons } from './components/share-buttons'
import type { JobQuery } from './graphql/job'
import { useJobQuery } from './graphql/job'
import { useViewJob } from './hooks/use-view-job'

export interface Props {
  job: JobQuery['job']
}

// const Content = styled('div', {
//   h1: {
//     fontSize: '1.8rem',
//     fontWeight: theme.fontWeights[600],
//     marginBottom: 8,
//   },

//   p: {
//     fontSize: '1rem',
//     lineHeight: '1.6',
//     minHeight: '1.6rem',
//   },
// })

// const POKEMONS_QUERY = gql`
//   query {
//     pokemons(limit: 10) {
//       id
//       name
//     }
//   }
// `

export const JobPage: Page<Props> = props => {
  const { job } = props

  // console.log(props)

  const jobId = useUrlQuery('id')

  const [{ data, operation }] = useJobQuery({
    variables: {
      id: jobId!,
    },
    pause: !jobId,
    requestPolicy: 'cache-and-network',
  })

  console.log('exists', !!data, operation?.key)
  // console.log('FETCHI?NG', !!ree[0].data, ree)

  // const reeee = useQuery({ query: POKEMONS_QUERY })

  useViewJob(job.id)

  // if (!data) {
  //   return null
  // }

  const {
    id,
    position,
    role,
    description,
    tags,
    applyUrl,
    company,
    viewCount,
    liked,
  } = data!.job

  console.log(position)

  return (
    <>
      <div>
        <div className="flex items-center justify-between py-20 border-b">
          <div>{'<- Back to all'}</div>
          <div>
            <Heading size={32}>{position}</Heading>
            <Text size={12} align="right">
              {role}
            </Text>
          </div>
        </div>
        <div className="inline-grid grid-flow-col gap-2">
          {tags.map(tag => (
            <Tag key={tag.id}>{tag.name}</Tag>
          ))}
        </div>

        <div className="flex justify-between">
          <div>
            <div>
              Company:{' '}
              <Link
                href={{ pathname: '/[slug]', query: { slug: company.slug } }}
              >
                <a className="hover:underline">
                  <strong>{company.name}</strong>
                </a>
              </Link>
            </div>
            <div>
              Website:{' '}
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>{company.website}</strong>
              </a>
            </div>
            <div>
              Twitter: <strong>{company.twitter}</strong>
            </div>
            <div>
              Apply URL: <strong>{applyUrl}</strong>
            </div>
            <div>
              Views: <strong>{viewCount}</strong>
            </div>
          </div>
          <div>
            <div className="flex">
              <ShareButtons />
              <JobLike id={id} liked={liked} />
            </div>
          </div>
        </div>

        <div className="py-10">
          {/* <Content
            dangerouslySetInnerHTML={{
              __html: generateHTML(JSON.parse(description), []),
            }}
          /> */}

          <pre>{/* <code>{JSON.stringify(description, null, 2)}</code> */}</pre>

          <Button>Apply</Button>
        </div>
      </div>
    </>
  )
}
