import { forwardRef } from 'react'
import type { Ref } from 'react'

import { composeRefs } from '@radix-ui/react-compose-refs'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { useId } from '@radix-ui/react-id'

import type { FieldProps } from '../field'
import { Field } from '../field'
import type { FormFieldProps } from '../form'
import { useField } from '../form'

import { Trigger } from './style'

interface Props extends FieldProps, FormFieldProps {
  children: React.ReactElement[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  invalid?: boolean
  disabled?: boolean
  required?: boolean
  placeholder?: string
  autoFocus?: boolean
  error?: string
}

const Select = (props: Props, ref: Ref<HTMLSelectElement>) => {
  const { children, value, placeholder, label, error } = props

  const { field, fieldState, formState } = useField(props)

  const invalid = props.invalid || Boolean(error) || fieldState?.invalid
  const disabled = props.disabled || formState?.isSubmitting

  const triggerId = useId()
  const errorMessage = fieldState?.error?.message ?? error

  return (
    <Field htmlFor={triggerId} label={label} error={errorMessage}>
      <Trigger
        ref={composeRefs(ref, field?.ref)}
        value={value ?? field?.value}
        {...field}
        id={triggerId}
        aria-invalid={invalid}
        data-empty={field?.value === '' || value === ''}
        disabled={disabled}
      >
        {placeholder && (
          <option value="" hidden disabled>
            {placeholder}
          </option>
        )}
        {children}
      </Trigger>
      <ChevronDownIcon
        className="pointer-events-none absolute top-[11px] right-3 h-3.5 w-3.5"
        aria-hidden
        focusable={false}
      />
    </Field>
  )
}

interface OptionProps {
  value: string
  children: string
}

const SelectOption = (props: OptionProps) => {
  const { value, children } = props
  return <option value={value}>{children}</option>
}

const _Select = Object.assign(forwardRef(Select), { Option: SelectOption })

export { _Select as Select }
export type { Props as SelectProps }
