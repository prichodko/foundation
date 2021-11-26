import { PlusCircledIcon } from '@radix-ui/react-icons'
import type { Page } from 'next'

import { SelectCity } from '~/components/select-city'
import { SelectCountry } from '~/components/select-country'
import { SelectJobRole } from '~/components/select-job-role'
import { SelectJobType } from '~/components/select-job-type'
import { TagInput } from '~/components/tag-input'
import { Button } from '~/system/button'
import { Checkbox } from '~/system/checkbox'
import { Editor } from '~/system/editor'
import type { FormSubmitHandler } from '~/system/form'
import { Form } from '~/system/form'
import { TextInput } from '~/system/input'
import { Slider } from '~/system/slider'
import { Text } from '~/system/text'
import type { CreateJobInput, JobRole } from '~/types/graphql'
import { JobType } from '~/types/graphql'

// import { useCreateCheckoutSessionMutation } from './graphql/create-checkout-session'
import { useCreateJobMutation } from './graphql/create-job'

interface Props {}

type Values = CreateJobInput

const Section = ({ heading, children }: any) => {
  return (
    <div className="p-10 border rounded-md bg-gray-2">
      <Text weight={'600'} size={16} className="mb-4">
        {heading}
      </Text>
      <div className="grid gap-5">{children} </div>
    </div>
  )
}

export const DashboardNew: Page = (props: Props) => {
  const {} = props

  const [, createJob] = useCreateJobMutation()
  // const [, createCheckoutSession] = useCreateCheckoutSessionMutation()

  const handleSubmit: FormSubmitHandler<Values> = async values => {
    console.log(createJob, values)
    await createJob({
      input: {
        position: values.position,
        role: values.role,
        tags: values.tags,
        description: JSON.stringify(values.description),
        applyUrl: values.applyUrl,
        remote: false,
        type: values.type,
      },
    })

    // const { data } = await createCheckoutSession({
    //   input: {
    //     name: 'hello',
    //     price: 100,
    //   },
    // })

    // window.open(data!.createCheckoutSession.sessionUrl, '_blank')
  }

  return (
    <>
      <Form<Values>
        defaultValues={{
          position: '',
          role: '' as JobRole,
          applyUrl: '',
          description: '',
          remote: false,
          tags: [],
          type: JobType.FullTime,
        }}
        onSubmit={handleSubmit}
        className="grid gap-5"
      >
        <Section heading="Job">
          <TextInput
            label="Position"
            name="position"
            rules={
              {
                // required: true,
                // validate: {
                //   trim: value => {
                //     return !!value.trim()
                //   },
                // },
              }
            }
          />

          <SelectJobRole name="role" />

          <SelectJobType name="type" />

          <TagInput name="tags" />

          <div className="grid items-end grid-cols-2 gap-4">
            <SelectCountry />
            <SelectCity name="city" />
            {/* <LocationInput name="location" /> */}
          </div>

          <div className="border border-dashed rounded bg-gray-2 h-[36px] text-low text-center flex items-center justify-center text-12 transition-colors hover:border-gray-11 hover:text">
            <PlusCircledIcon className="mr-2" />
            Add location
          </div>

          <Editor label="Job Description" name="description" />

          <TextInput label="Apply URL / Email" name="applyUrl" />
        </Section>
        {/*
        <Section heading="Company">
          <div className="grid gap-5">
            <TextInput label="Company" name="company" />
            <TextInput label="Email" name="email" />
            <TextInput label="About" name="about" />
            <TextInput label="Website" name="website" />
            <TextInput label="Twitter" name="twitter" placeholder="@jack" />
            <div>logo</div>
          </div>
        </Section> */}

        <Section heading="Compensation">
          <div className="grid items-end grid-cols-2 gap-4">
            <TextInput label="Salary" name="salaryMin" placeholder="Min" />
            <TextInput name="salaryMax" placeholder="Max" />
          </div>

          <div className="grid items-end grid-cols-2 gap-4">
            <TextInput label="Equity" name="salaryMin" />
            <TextInput name="salaryMax" />
          </div>

          <Checkbox name="acceptsCrypto">Pay in crypto</Checkbox>
        </Section>

        <Section heading="Payment">
          <Slider label="Price" />
          <div>Bundle and payment</div>
        </Section>

        <Section heading="Feedback">
          <TextInput placeholder="feedback" />
        </Section>

        <div className="grid grid-cols-2 gap-6">
          <Button type="submit">Pay with Card</Button>
          <Button type="submit">Pay with Crypto</Button>
        </div>
      </Form>
    </>
  )
}
