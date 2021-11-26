import { Select } from '~/system/select'
import type { JobType } from '~/types/graphql'

interface Props {
  name: string
}

const options: Record<JobType, string> = {
  FullTime: 'Full-time',
  Contract: 'Contract',
  PartTime: 'Part-time',
  Internship: 'Internship',
}

export const SelectJobType = (props: Props) => {
  const { name } = props

  return (
    <Select label="Job Type" name={name} placeholder="Select a type">
      {Object.entries(options).map(([key, value]) => (
        <Select.Option key={key} value={key}>
          {value}
        </Select.Option>
      ))}
    </Select>
  )
}
