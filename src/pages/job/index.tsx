import { generateHTML } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import type { Page } from 'next'

import { Link } from '~/components/link'
import { Tag } from '~/components/tag'
import { useUrlQuery } from '~/hooks/use-url-query'
import { styled, theme } from '~/styles/config'
import { BaseButton, Button } from '~/system/button'
import { Heading } from '~/system/heading'
import { Text } from '~/system/text'

import { useAddLikeMutation } from '../homepage/graphql/add-like'
import { useRemoveLikeMutation } from '../homepage/graphql/remove-like'

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

  const [, addLike] = useAddLikeMutation()
  const [, removeLike] = useRemoveLikeMutation()

  useViewJob(jobId)

  if (!data) {
    return <div>Loading...</div>
  }

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
  } = data.job

  // console.log(generateHTML(JSON.parse(description), [StarterKit]))

  // const html = useMemo(
  //   () => generateHTML(JSON.parse(description), [StarterKit]),
  //   [description]
  // )

  const handleLikeClick = async () => {
    await addLike({ jobId: id })
  }

  const handleUnlikeClick = async () => {
    await removeLike({ jobId: id })
  }

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
            <div>
              {liked ? (
                <BaseButton onClick={handleUnlikeClick}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                </BaseButton>
              ) : (
                <BaseButton onClick={handleLikeClick}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </BaseButton>
              )}
            </div>
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
