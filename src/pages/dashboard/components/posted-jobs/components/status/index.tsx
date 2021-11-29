import { JobStatus } from '~/types/graphql'

interface Props {
  status: JobStatus
}

export const Status = (props: Props) => {
  const { status } = props

  if (status === JobStatus.Live) {
    return (
      <span className="px-2 py-1 border rounded text-12 bg-green-1 border-green-7 text-green">
        Live
      </span>
    )
  }

  if (status === JobStatus.Draft) {
    return (
      <span className="px-2 py-1 border rounded text-12 bg-blue-1 border-blue-7 text-blue">
        Draft
      </span>
    )
  }

  if (status === JobStatus.Closed) {
    return (
      <span className="px-2 py-1 border rounded text-12 bg-yellow-1 border-yellow-7 text-yellow">
        Closed
      </span>
    )
  }

  // if (status === JobStatus.Archived) {
  //   return (
  //     <span className="px-2 py-1 border rounded-sm text-12 bg-red-1 border-red-6 text-red">
  //       Archived
  //     </span>
  //   )
  // }

  return null
}
