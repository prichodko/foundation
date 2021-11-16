import { useState } from 'react'

import { Link } from '~/components/link'
import { Tag } from '~/components/tag'
import { BaseButton, Button } from '~/system/button'
import { Heading } from '~/system/heading'
import { TextInput } from '~/system/input'
import { Text } from '~/system/text'

import { Search } from './components/search'
import { useAddLikeMutation } from './graphql/add-like'
import type { JobsQuery } from './graphql/jobs'
import { useJobsQuery } from './graphql/jobs'
import { useRemoveLikeMutation } from './graphql/remove-like'

const JobPosting = ({ job }: { job: JobsQuery['jobs'][0] }) => {
  const [, addLike] = useAddLikeMutation()
  const [, removeLike] = useRemoveLikeMutation()

  const { id, position, tags, liked, company } = job

  const handleClick = async () => {
    await addLike({ jobId: id })
  }

  const handleClick2 = async () => {
    await removeLike({ jobId: id })
  }

  return (
    <Link
      href={{
        pathname: '/dashboard/[slug]/[id]',
        query: {
          slug: company.slug,
          id: job.id,
        },
      }}
    >
      <a className="flex items-center py-5 space-x-4 border-t hover:bg-gray-1">
        {/* <div className="mr-6">
          <img
            src="data:image/png;base64,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"
            className="w-[60px] h-[60px] rounded-md"
          />
        </div> */}

        <Text weight={500}>{position}</Text>
        <Text className="">{company.name} / 2d / Remote</Text>
        <div className="inline-grid grid-flow-col gap-2">
          {tags.map(tag => (
            <Tag key={tag.id}>{tag.name}</Tag>
          ))}
        </div>

        <div>
          {liked ? (
            <BaseButton onClick={handleClick2}>
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
            <BaseButton onClick={handleClick}>
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
      </a>
    </Link>
  )
}

export const Workverse = () => {
  const [query, setQuery] = useState({
    remote: false,
    tags: [],
    // tags: ['ckvnyujhs0241osoanxaxcd4u'],
  })

  const [{ data }] = useJobsQuery({
    variables: {
      input: {
        query,
      },
    },
  })

  return (
    <>
      <div className="max-w-3xl mx-auto min-h-[30vh]">
        <Search fff={query} onChange={setQuery}>
          {/* <Section key="tags" title="Tags">
            <Item>Hello</Item>
            <Item>Meow</Item>
          </Section>
          <Section key="location" title="Location">
            <Item>Remote</Item>
            <Item>United States</Item>
            <Item>Europe</Item>
          </Section>
          <Section key="role" title="Role">
            <Item>Engineering</Item>
            <Item>Design</Item>
            <Item>Product</Item>
          </Section> */}
        </Search>
      </div>

      {/* <div>
        <pre>{JSON.stringify(query, null, 2)}</pre>
      </div> */}

      <div className="grid gap-4">
        {data?.jobs.map(job => (
          <JobPosting key={job.id} job={job} />
        ))}
        <Link href="/dashboard/new">
          <a className="border border-dashed h-[118px] rounded-lg flex items-center justify-center">
            <Text weight={500}>YOUR POST HERE</Text>
          </a>
        </Link>
      </div>

      <div className="h-36"></div>
      <div className="p-12 rounded-lg bg-gray-12">
        <Heading level={2} size={24} className="mb-4 text-light">
          Subscribe
        </Heading>
        <Text className="w-2/3 mb-4 text-light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic deserunt
          itaque cupiditate inventore similique? Illo necessitatibus eos, velit
          sit, iusto numquam delectus similique veniam nihil aliquam voluptate
          blanditiis rerum facilis! Meow!
        </Text>
        <div className="flex">
          <TextInput />
          <Button variant="outline">Subsrcibe</Button>
        </div>
      </div>
    </>
  )
}
