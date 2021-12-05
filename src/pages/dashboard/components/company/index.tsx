import { Button } from '~/system/button'
import type { FormSubmitHandler } from '~/system/form'
import { Form } from '~/system/form'
import { TextInput } from '~/system/input'
import type { UpdateCompanyInput } from '~/types/graphql'
import { companySchema } from '~/validation/company'

import type { UserQuery } from '../../graphql/user'

import { useUpdateCompanyMutation } from './graphql/update-company'

interface Props {
  company: UserQuery['user']['company']
}

type Values = Required<UpdateCompanyInput>

export const Company = (props: Props) => {
  const { company } = props

  const [, updateCompany] = useUpdateCompanyMutation()

  if (!company) {
    return null
  }

  const handleSubmit: FormSubmitHandler<Values> = async values => {
    await updateCompany({
      input: {
        id: company.id,
        email: values.email,
        name: values.name,
        description: values.description,
        website: values.website,
        twitter: values.twitter,
      },
    })
  }

  return (
    <div className="p-10 border rounded bg-gray-2">
      <Form<Values>
        className="grid gap-4"
        defaultValues={{
          id: company.id,
          email: company.email ?? '',
          name: company.name ?? '',
          description: company.description ?? '',
          twitter: company.twitter ?? '',
          website: company.website ?? '',
        }}
        onSubmit={handleSubmit}
        schema={companySchema.update}
      >
        <TextInput label="Company" name="name" />
        <TextInput label="Email" name="email" />
        <TextInput label="Description" name="description" />
        <TextInput label="Website" name="website" />
        <TextInput label="Twitter" name="twitter" placeholder="@jack" />
        <Button type="submit">Save</Button>
      </Form>
    </div>
  )
}
