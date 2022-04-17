import { forwardRef } from 'react'

import { composeRefs } from '@radix-ui/react-compose-refs'
import { useId } from '@radix-ui/react-id'

import { Field } from '../field'
import { useField } from '../form'
import { Input } from './style'

import type { FieldProps } from '../field'
import type { FormFieldProps } from '../form'
import type { Ref } from 'react'

type InputProps = React.AllHTMLAttributes<HTMLInputElement>

interface Props extends FieldProps, FormFieldProps {
  type?: InputProps['type']
  value?: string
  onChange?: InputProps['onChange']
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  invalid?: boolean
  id?: string
  /* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautocomplete */
  autoComplete?: string
  maxLength?: number
  minLength?: number
  placeholder?: string
  inputMode?:
    | 'none'
    | 'text'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal'
    | 'search'
}

const TextInput = (props: Props, ref: Ref<HTMLInputElement>) => {
  const { label, error } = props

  const { field, fieldState, formState } = useField(props)

  const value = props.value ?? field?.value
  const onChange = props.onChange ?? field?.onChange
  const invalid = props.invalid || Boolean(error) || Boolean(fieldState?.error)
  const disabled = props.disabled || formState?.isSubmitting

  const inputId = useId()
  const errorMessage = fieldState?.error?.message ?? error

  return (
    <Field htmlFor={inputId} label={label} error={errorMessage}>
      <Input
        {...props}
        {...field}
        ref={composeRefs(ref, field?.ref)}
        value={value}
        onChange={onChange}
        id={inputId}
        aria-invalid={invalid}
        disabled={disabled}
      />
    </Field>
  )
}

const _TextInput = forwardRef(TextInput)

export { _TextInput as TextInput }
export type { Props as TextInputProps }
