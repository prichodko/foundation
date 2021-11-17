import { Link } from '~/components/link'

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
            query: {
              slug: job.company.slug,
              id: job.id,
            },
          }}
        >
          <a className="border border-dashed h-[118px] rounded-lg flex items-center justify-center">
            {job.id}: {job.position}
          </a>
        </Link>
      ))}
    </div>
  )
}
