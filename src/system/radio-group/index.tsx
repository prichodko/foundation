import { useId } from '@radix-ui/react-id'

import type { FormFieldProps } from '~/system/forms'
import { useField } from '~/system/forms'
import { Label } from '~/system/label'

import { Root, Item, Indicator } from './style'

interface Props extends FormFieldProps {
  value?: string
  onChange?: (value: string) => void
  children: React.ReactNode
  disabled?: boolean
  invalid?: boolean
  required?: boolean
}

const RadioGroup = (props: Props) => {
  const { value, onChange, children, required } = props

  const { field, fieldState, formState } = useField(props)

  const invalid = props.invalid || fieldState?.invalid
  const disabled = props.disabled || formState?.isSubmitting

  return (
    <Root
      value={value ?? field?.value}
      onValueChange={onChange ?? field?.onChange}
      required={required}
      aria-disabled={disabled}
      aria-invalid={invalid}
      className="space-y-3"
    >
      {children}
    </Root>
  )
}

interface ItemProps {
  children: React.ReactNode
  value: string
  disabled?: boolean
  required?: boolean
}

const RadioGroupItem = (props: ItemProps) => {
  const { children, value, disabled, required } = props

  const itemId = useId()

  return (
    <Label label={children}>
      <Item id={itemId} value={value} required={required} disabled={disabled}>
        <Indicator />
      </Item>
    </Label>
  )
}

RadioGroup.Item = RadioGroupItem

export { RadioGroup }
export type { Props as RadioGroupProps }
