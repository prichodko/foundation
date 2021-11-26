import { Select } from '~/system/select'
import type { JobRole } from '~/types/graphql'

interface Props {
  name: string
}

const options: Record<JobRole, string> = {
  AccountingAndFinance: 'Accounting & Finance',
  Administration: 'Administration',
  BusinessDevelopment: 'Business Development',
  CustomerService: 'Customer Service',
  Design: 'Design',
  Engineering: 'Engineering',
  IT: 'IT',
  Legal: 'Legal',
  MarketingAndCommunications: 'Marketing & Communications',
  Operations: 'Operations',
  PeopleAndHR: 'People & HR',
  Product: 'Product',
  QualityAssurance: 'Quality Assurance',
  Sales: 'Sales',
  Other: 'Other',
}

export const SelectJobRole = (props: Props) => {
  const { name } = props

  return (
    <Select label="Role" name={name} placeholder="Select a role">
      {Object.entries(options).map(([key, value]) => (
        <Select.Option key={key} value={key}>
          {value}
        </Select.Option>
      ))}
    </Select>
  )
}
