import { Select } from '~/system/select'

interface Props {
  name: string
}

export const SelectRole = (props: Props) => {
  const { name } = props

  return (
    <Select label="Role" name={name}>
      <Select.Option value="Accounting & Finance">
        Accounting & Finance
      </Select.Option>
      <Select.Option value="Administration">Administration</Select.Option>
      <Select.Option value="Customer Service">Customer Service</Select.Option>
      <Select.Option value="Design">Design</Select.Option>
      <Select.Option value="IT">IT</Select.Option>
      <Select.Option value="Legal">Legal</Select.Option>
      <Select.Option value="Marketing & Communications">
        Marketing & Communications
      </Select.Option>
      <Select.Option value="Operations">Operations</Select.Option>
      <Select.Option value="Engineering">Engineering</Select.Option>
      <Select.Option value="People & HR">People & HR</Select.Option>
      <Select.Option value="Product">Product</Select.Option>
      <Select.Option value="Quality Assurance">Quality Assurance</Select.Option>
      <Select.Option value="Sales">Sales</Select.Option>
      <Select.Option value="Business Development">
        Business Development
      </Select.Option>
      <Select.Option value="Other">Other</Select.Option>
    </Select>
  )
}
