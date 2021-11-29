import { Button } from '~/system/button'
import type { FormSubmitHandler } from '~/system/form'
import { Form } from '~/system/form'
import { TextInput } from '~/system/input'
import { Text } from '~/system/text'
import type { UpdateUserInput } from '~/types/graphql'

import type { UserQuery } from '../../graphql/user'

import { useUpdateUserMutation } from './graphql/update-user'

interface Props {
  user: UserQuery['user']
}

type Values = Omit<UpdateUserInput, 'id'>

export const Account = (props: Props) => {
  const { user } = props

  const [, updateUser] = useUpdateUserMutation()

  if (!user) {
    return <div>loading...</div>
  }

  const handleSubmit: FormSubmitHandler<Values> = async values => {
    await updateUser({
      input: {
        name: values.name,
      },
    })
  }

  return (
    <div className="p-10 border rounded bg-gray-2">
      <Form<Values>
        className="grid gap-4"
        defaultValues={{
          name: user.name ?? '',
        }}
        onSubmit={handleSubmit}
      >
        <TextInput label="Email" value={user.email} disabled />
        <div>
          <TextInput label="Name" name="name" />
          <Text size={12} color="secondary" className="mt-1">
            Your full name, or a display name you are comfortable with.
          </Text>
        </div>
        <Button type="submit">Save</Button>
      </Form>
    </div>
  )
}
