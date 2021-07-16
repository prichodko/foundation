import type {
  RadioGroupOwnProps,
  RadioGroupItemOwnProps,
} from '@radix-ui/react-radio-group'
import { ReactNode } from 'react'

import { Label, LabelProps } from '~/system/label'

import { Root, Item, Indicator } from './style'

interface Props extends RadioGroupOwnProps {
  value: string
  onChange: (value: string) => void
  children: ReactNode
  required?: boolean
}

const RadioGroup = (props: Props) => {
  const { value, onChange, children, required } = props

  return (
    <Root
      value={value}
      onValueChange={onChange}
      required={required}
      className="flex flex-col space-y-3"
    >
      {children}
    </Root>
  )
}

interface RadioGroupItemProps extends RadioGroupItemOwnProps, LabelProps {
  value: string
  disabled?: boolean
  required?: boolean
}

const RadioGroupItem = (props: RadioGroupItemProps) => {
  const { hideLabel, children, value, disabled, required } = props

  return (
    <Label label={children} hideLabel={hideLabel}>
      <Item value={value} required={required} disabled={disabled}>
        <Indicator />
      </Item>
    </Label>
  )
}

RadioGroup.Item = RadioGroupItem

export { RadioGroup }
export type { Props as RadioGroupProps }
