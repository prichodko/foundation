import { ChevronDownIcon } from '@radix-ui/react-icons'
import { useId } from '@radix-ui/react-id'
import React from 'react'
import { ReactElement } from 'react'

import { Field, FieldProps } from '../field'
import { FormFieldProps, useField } from '../forms'
import { Trigger } from './style'

interface Props extends FieldProps, FormFieldProps {
  children: ReactElement[]
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

const Select = (props: Props) => {
  const { children, value, placeholder, label, error } = props

  const { field, fieldState, formState } = useField(props)

  const invalid = props.invalid || Boolean(error) || fieldState?.invalid
  const disabled = props.disabled || formState?.isSubmitting

  const triggerId = useId()
  const errorMessage = fieldState?.error?.message ?? error

  return (
    <Field id={triggerId} label={label} error={errorMessage}>
      <>
        <Trigger
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
          className="h-3.5 w-3.5 absolute top-1/2 -translate-y-1/2 right-3 pointer-events-none"
          aria-hidden="true"
          focusable={false}
        />
      </>
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

Select.Option = SelectOption

export { Select }
export type { Props as SelectProps }
