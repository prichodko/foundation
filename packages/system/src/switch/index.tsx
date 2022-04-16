import { useId } from '@radix-ui/react-id'

import type { FormFieldProps } from '../form'
import { useField } from '../form'
import { Label } from '../label'

import { Root, Thumb } from './style'

interface Props extends FormFieldProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  required?: boolean
  disabled?: boolean
  children: React.ReactNode
}

const Switch = (props: Props) => {
  const { checked, onChange, required, children } = props

  const switchId = useId()

  const { field, formState } = useField(props)

  const disabled = props.disabled || formState?.isSubmitting

  return (
    <Label label={children}>
      <Root
        id={switchId}
        checked={checked ?? field?.value}
        onCheckedChange={onChange ?? field?.onChange}
        required={required}
        disabled={disabled}
      >
        <Thumb />
      </Root>
    </Label>
  )
}

export { Switch }
export type { Props as SwitchProps }
