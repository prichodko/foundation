import type { InferGetStaticPropsType } from 'next'

export const getStaticProps = async () => {
  return {
    props: {
      jobs: [],
    },
  }
}

interface Props extends InferGetStaticPropsType<typeof getStaticProps> {}

export default function GamingJobs(props: Props) {
  const { jobs } = props

  return (
    <div>
      {jobs.map((job: any) => (
        <div key={job.id}>{job.name}</div>
      ))}
    </div>
  )
}
