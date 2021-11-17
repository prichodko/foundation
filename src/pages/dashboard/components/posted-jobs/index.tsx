import { PlusCircledIcon } from '@radix-ui/react-icons'

import { Link } from '~/components/link'
import { RelativeTime } from '~/components/relative-time'
import { Text } from '~/system/text'

import type { UserQuery } from '../../graphql/user'

interface Props {
  jobs: UserQuery['user']['jobs']
}

export const PostedJobs = (props: Props) => {
  const { jobs } = props

  return (
    <div className="">
      <div className="mb-2 divide-y">
        {jobs.map(job => (
          <Link
            key={job.id}
            href={{ pathname: '/dashboard/jobs/[id]', query: { id: job.id } }}
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
              <Text size={12}>{job.status}</Text>
              <Text size={12}>
                <RelativeTime>{job.createdAt}</RelativeTime>
              </Text>
            </a>
          </Link>
        ))}
      </div>

      <Link href="/dashboard/new">
        <a className="border border-dashed h-[46px] rounded-lg flex items-center justify-center hover:bg-gray-2">
          <PlusCircledIcon className="mr-2" />
          <Text weight={500} size={12}>
            Create new
          </Text>
        </a>
      </Link>
    </div>
  )
}
