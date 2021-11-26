import { useState } from 'react'

import { Link } from '~/components/link'
import { RelativeTime } from '~/components/relative-time'
import { BaseButton, Button } from '~/system/button'
import { Text } from '~/system/text'
import type { JobsFilter } from '~/types/graphql'

import { Search } from './components/search'
import { useAddLikeMutation } from './graphql/add-like'
import { useCreateAlertMutation } from './graphql/create-alert'
import type { JobsQuery } from './graphql/jobs'
import { useJobsQuery } from './graphql/jobs'
import { useRemoveLikeMutation } from './graphql/remove-like'

const JobPosting = ({ job }: { job: JobsQuery['jobs'][0] }) => {
  const [, addLike] = useAddLikeMutation()
  const [, removeLike] = useRemoveLikeMutation()

  const handleLikeClick = async () => {
    await addLike({ jobId: job.id })
  }

  const handleUnlikeClick = async () => {
    await removeLike({ jobId: job.id })
  }

  return (
    <Link
      key={job.id}
      href={{
        pathname: '/[slug]/[id]',
        query: { slug: job.company.slug, id: job.id },
      }}
    >
      <a className="flex items-center p-4 space-x-10 rounded hover:bg-gray-2">
        <div className="min-w-[200px]">
          <Text weight={500}>{job.position}</Text>
        </div>
        <div className="min-w-[140px]">
          <Text size={12}>{job.role}</Text>
        </div>
        <div className="flex flex-1 space-x-2">
          {job.tags.map(tag => (
            <Text key={tag.id} size={12}>
              #{tag.name}
            </Text>
          ))}
        </div>
        <Text size={12}>
          <RelativeTime>{job.createdAt}</RelativeTime>
        </Text>

        <div>
          {job.liked ? (
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
      </a>
    </Link>
  )
}

export const Workverse = () => {
  const [filter, setFilter] = useState<JobsFilter>({})

  const [{ data }] = useJobsQuery({
    variables: {
      filter,
    },
  })

  const [, createAlert] = useCreateAlertMutation()

  const handleCreateAlert = async () => {
    await createAlert({
      input: {
        filter,
      },
    })
  }

  return (
    <>
      <div className="max-w-3xl mx-auto min-h-[30vh]">
        <Search filter={filter} onChange={setFilter} />
      </div>

      <div className="flex justify-between mb-4">
        <pre>{JSON.stringify(filter, null, 2)}</pre>
        <div>
          <Button onPress={handleCreateAlert}>New Alert</Button>
        </div>
      </div>

      <div className="grid gap-4">
        {data?.jobs.map(job => (
          <JobPosting key={job.id} job={job} />
        ))}
        {/* <Link href="/dashboard/new">
          <a className="border border-dashed h-[118px] rounded-lg flex items-center justify-center">
            <Text weight={500}>YOUR POST HERE</Text>
          </a>
        </Link> */}
      </div>

      {/* <div className="h-36"></div>
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
      </div> */}
    </>
  )
}
