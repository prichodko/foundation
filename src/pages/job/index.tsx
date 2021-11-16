import { generateHTML } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import type { Page } from 'next'

import { Tag } from '~/components/tag'
import { useUrlQuery } from '~/hooks/use-url-query'
import { styled, theme } from '~/styles/config'
import { Button } from '~/system/button'
import { Heading } from '~/system/heading'

import { useJobQuery } from './graphql/job'
import { useViewJob } from './hooks/use-view-job'

interface Props {}

const Content = styled('div', {
  h1: {
    fontSize: '1.8rem',
    fontWeight: theme.fontWeights[600],
    marginBottom: 8,
  },

  p: {
    fontSize: '1rem',
    lineHeight: '1.6',
    minHeight: '1.6rem',
  },
})

export const Job: Page = (props: Props) => {
  const {} = props

  const jobId = useUrlQuery('id')

  const [{ data }] = useJobQuery({
    variables: {
      id: jobId!,
    },
    pause: !jobId,
  })
  useViewJob(jobId)

  if (!data) {
    return <div>Loading...</div>
  }

  const { position, description, tags, applyUrl, company, viewCount } = data.job

  // console.log(generateHTML(JSON.parse(description), [StarterKit]))

  // const html = useMemo(
  //   () => generateHTML(JSON.parse(description), [StarterKit]),
  //   [description]
  // )

  return (
    <>
      <div>
        <div className="flex items-center justify-between py-20 border-b">
          <div>{'<- Back to all'}</div>
          <div>
            <Heading size={32}>{position}</Heading>
          </div>
        </div>
        <div className="inline-grid grid-flow-col gap-2">
          {tags.map(tag => (
            <Tag key={tag.id}>{tag.name}</Tag>
          ))}
        </div>

        <div>
          <div>
            Company: <strong>{company.name}</strong>
          </div>
          <div>
            Website: <strong>{company.website}</strong>
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

        <div className="py-10">
          <Content
            dangerouslySetInnerHTML={{
              __html: generateHTML(JSON.parse(description), [StarterKit]),
            }}
          />

          <Button>Apply</Button>
        </div>
      </div>
    </>
  )
}
