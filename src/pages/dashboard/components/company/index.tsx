import { useRef } from 'react'

import Image from 'next/image'

import { Button } from '~/system/button'
import type { FormSubmitHandler } from '~/system/form'
import { Form } from '~/system/form'
import { TextInput } from '~/system/input'
import { Text } from '~/system/text'
import type { UpdateCompanyInput } from '~/types/graphql'
import { companySchema } from '~/validation/company'

import type { UserQuery } from '../../graphql/user'

import { useUpdateCompanyMutation } from './graphql/update-company'
import { useUpdateCompanyLogo } from './hooks/use-update-company-logo'

interface Props {
  company: UserQuery['user']['company']
}

type Values = Required<UpdateCompanyInput>

export const Company = (props: Props) => {
  const { company } = props

  const [, updateCompany] = useUpdateCompanyMutation()

  const [updateCompanyLogo] = useUpdateCompanyLogo(company?.id)

  const fileInputRef = useRef<HTMLInputElement>(null)

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

  const handleFileChange: React.ChangeEventHandler<
    HTMLInputElement
  > = async event => {
    const file = event.target.files?.[0]

    if (!file) {
      event.target.value = ''
      return
    }

    await updateCompanyLogo(file)
  }

  return (
    <div className="p-10 border rounded bg-gray-2">
      <div className="flex items-center justify-between mb-4">
        <div>
          <Text weight={600}>Company logo</Text>
          <Text>
            Click on the avatar to upload a custom one from your files.
          </Text>
        </div>
        <div>
          <button
            onClick={() => fileInputRef.current!.click()}
            className="hover:opacity-80"
          >
            {company.logoUrl ? (
              <Image
                src={`https://imagedelivery.net/s8UKimEMyKeBrkJ-3SroxA/${company.logoUrl}/logo`}
                width={100}
                height={100}
                unoptimized
                className="rounded-md"
                alt="logo"
              />
            ) : (
              <div className="min-w-[100px] min-h-[100px] bg-gray-4">
                CLICK HERE
              </div>
            )}
          </button>
          <input
            ref={fileInputRef}
            className="sr-only"
            type="file"
            accept="image/png,image/jpeg"
            onChange={handleFileChange}
          />
        </div>
      </div>

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
