import { useState } from 'react'

import { JobLike } from '~/components/job-like'
import { Link } from '~/components/link'
import { RelativeTime } from '~/components/relative-time'
import { Button } from '~/system/button'
import { Heading } from '~/system/heading'
import { TextInput } from '~/system/input'
import { Text } from '~/system/text'
import type { JobsFilter } from '~/types/graphql'

import { Search } from './components/search'
import { useCreateAlertMutation } from './graphql/create-alert'
import type { JobsQuery } from './graphql/jobs'
import { useJobsQuery } from './graphql/jobs'

const JobPosting = ({
  job,
}: {
  job: JobsQuery['jobs']['edges'][number]['node']
}) => {
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
          <JobLike id={job.id} liked={job.liked} />
        </div>
      </a>
    </Link>
  )
}

export const Workverse = () => {
  const [filter, setFilter] = useState<JobsFilter>({})
  const [after, setAfter] = useState<string>()

  const [, createAlert] = useCreateAlertMutation()
  const [{ data, fetching }] = useJobsQuery({
    variables: {
      filter,
      first: 2,
      after,
    },
  })

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
        {data?.jobs.edges.map(edge => (
          <JobPosting key={edge.node.id} job={edge.node} />
        ))}
        {/* <Link href="/dashboard/new">
          <a className="border border-dashed h-[118px] rounded-lg flex items-center justify-center">
            <Text weight={500}>YOUR POST HERE</Text>
          </a>
        </Link> */}

        {data?.jobs.pageInfo.hasNextPage && (
          <Button
            onPress={() => setAfter(data.jobs.pageInfo.endCursor!)}
            loading={fetching}
            variant="minimal"
          >
            Load More
          </Button>
        )}
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
