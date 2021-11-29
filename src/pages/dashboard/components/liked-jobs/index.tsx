import { JobLike } from '~/components/job-like'
import { Link } from '~/components/link'
import { RelativeTime } from '~/components/relative-time'
import { Text } from '~/system/text'

import type { UserQuery } from '../../graphql/user'

interface Props {
  likes: UserQuery['user']['likes']
}

export const LikedJobs = (props: Props) => {
  const { likes } = props

  return (
    <div>
      {likes.map(job => (
        <Link
          key={job.id}
          href={{
            pathname: '/[slug]/[id]',
            query: { id: job.id, slug: job.company.slug },
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
              <JobLike id={job.id} liked={true} />
            </div>
          </a>
        </Link>
      ))}
    </div>
  )
}
