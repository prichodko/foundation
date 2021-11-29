import { DotsVerticalIcon, PlusCircledIcon } from '@radix-ui/react-icons'

import { Link } from '~/components/link'
import { RelativeTime } from '~/components/relative-time'
import { Button } from '~/system/button'
import { Menu, MenuTrigger } from '~/system/menu'
import { Text } from '~/system/text'

import type { UserQuery } from '../../graphql/user'

import { Status } from './components/status'
import { useArchiveJobMutation } from './graphql/archive-job'
import { usePublishJobMutation } from './graphql/publish-job'
import { useUnpublishJobMutation } from './graphql/unpublish-job'

interface Props {
  jobs: UserQuery['user']['jobs']
}

export const PostedJobs = (props: Props) => {
  const { jobs } = props

  const [, publishJob] = usePublishJobMutation()
  const [, unpublishJob] = useUnpublishJobMutation()
  const [, archiveJob] = useArchiveJobMutation()

  const handlePublish = async (jobId: string) => {
    await publishJob({ id: jobId })
  }

  const handleUnpublish = async (jobId: string) => {
    await unpublishJob({ id: jobId })
  }

  const handleArchive = async (jobId: string) => {
    await archiveJob({ id: jobId })
  }

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
              <Text size={12}>
                <RelativeTime>{job.createdAt}</RelativeTime>
              </Text>
              <Status status={job.status} />

              <MenuTrigger>
                <Button variant="minimal">
                  <DotsVerticalIcon />
                </Button>
                <Menu>
                  <Menu.Item onSelect={() => handlePublish(job.id)}>
                    Publish
                  </Menu.Item>
                  <Menu.Item onSelect={() => handleUnpublish(job.id)}>
                    Unpublish
                  </Menu.Item>
                  <Menu.Item onSelect={() => handleArchive(job.id)}>
                    Archive
                  </Menu.Item>
                </Menu>
              </MenuTrigger>
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
