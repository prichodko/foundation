import { CheckIcon } from '@radix-ui/react-icons'
import { useId } from '@radix-ui/react-id'

import type { FormFieldProps } from '~/system/forms'
import { useField } from '~/system/forms'
import { Label } from '~/system/label'

import { Root, Indicator } from './style'

interface Props extends FormFieldProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  invalid?: boolean
  disabled?: boolean
  required?: boolean
  children?: React.ReactNode
}

export const Checkbox = (props: Props) => {
  const { children, checked, onChange, required } = props

  const checkboxId = useId()

  const { field, fieldState, formState } = useField(props)

  const invalid = props.invalid || fieldState?.invalid
  const disabled = props.disabled || formState?.isSubmitting

  return (
    <Label label={children}>
      <Root
        id={checkboxId}
        checked={checked ?? field?.value}
        onCheckedChange={onChange ?? field?.onChange}
        disabled={disabled}
        required={required}
        aria-invalid={invalid}
        ref={field?.ref}
      >
        <Indicator>
          <CheckIcon />
        </Indicator>
      </Root>
    </Label>
  )
}

export type { Props as CheckboxProps }
