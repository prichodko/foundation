import type { Page } from 'next'

import { SelectJobRole } from '~/components/select-job-role'
import { TagInput } from '~/components/tag-input'
import { useUrlQuery } from '~/hooks/use-url-query'
import { useJobQuery } from '~/pages/job/graphql/job'
import { Button } from '~/system/button'
import { Editor } from '~/system/editor'
import type { FormSubmitHandler } from '~/system/form'
import { Form } from '~/system/form'
import { TextInput } from '~/system/input'
import type { UpdateJobInput } from '~/types/graphql'
import { jobSchema } from '~/validation/job'

import { useUpdateJobMutation } from './graphql/update-job'

interface Props {}

type Values = UpdateJobInput

export const DashboardJob: Page = (props: Props) => {
  const {} = props

  const jobId = useUrlQuery('id')

  const [, updateJob] = useUpdateJobMutation()
  const [{ data }] = useJobQuery({
    variables: {
      id: jobId!,
    },
    pause: !jobId,
  })

  if (!data) {
    return <div>Loading...</div>
  }

  const handleSubmit: FormSubmitHandler<Values> = async values => {
    await updateJob({
      input: {
        id: jobId!,
        position: values.position,
        role: values.role,
        description: values.description,
        applyUrl: values.applyUrl,
        tags: values.tags,
        remote: false,
        type: values.type,
      },
    })
  }

  const { job } = data

  return (
    <>
      <div className="flex justify-end mb-12">
        <Button
          href={{
            pathname: '/[slug]/[id]',
            query: {
              slug: job.company.slug,
              id: job.id,
            },
          }}
          external
        >
          View
        </Button>
      </div>
      <Form<Values>
        className="grid gap-6"
        defaultValues={{
          id: job.id,
          position: job.position,
          description: job.description,
          role: job.role,
          applyUrl: job.applyUrl,
          remote: false,
          tags: job.tags.map(tag => tag.id),
          type: job.type,
        }}
        onSubmit={handleSubmit}
        schema={jobSchema.update}
      >
        <TextInput label="Position" name="position" />
        <SelectJobRole name="role" />
        <Editor label="Job Description" name="description" />
        <TextInput label="Apply URL / Email" name="applyUrl" />
        <TagInput name="tags" />

        <Button type="submit">Save</Button>
      </Form>
    </>
  )
}
