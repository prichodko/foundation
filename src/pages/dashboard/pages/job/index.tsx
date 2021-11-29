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

import { useUpdateJobMutation } from './graphql/update-job'

interface Props {}

type Values = Omit<UpdateJobInput, 'id'>

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
      },
    })
  }

  const { job } = data

  return (
    <>
      <Form<Values>
        className="grid gap-6"
        defaultValues={{
          position: job.position,
          description: job.description,
          role: job.role,
          applyUrl: job.applyUrl,
          remote: false,
          tags: job.tags.map(tag => tag.id),
        }}
        onSubmit={handleSubmit}
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
