import { composeRefs } from '@radix-ui/react-compose-refs'
import { useId } from '@radix-ui/react-id'
import { forwardRef, Ref } from 'react'

import { Field, FieldProps } from '~/system/field'

import { FormFieldProps, useField } from '../../forms'
import type { InputProps } from '../input'
import { Input } from './style'

interface Props extends InputProps, FieldProps, FormFieldProps {}

const TextInput = (props: Props, ref: Ref<HTMLInputElement>) => {
  const { label, error } = props

  const { field, fieldState, formState } = useField(props)

  const invalid = props.invalid || Boolean(error) || fieldState?.invalid
  const disabled = props.disabled || formState?.isSubmitting

  const inputId = useId()
  const errorMessage = fieldState?.error?.message ?? error

  return (
    <Field id={inputId} label={label} error={errorMessage}>
      <Input
        {...props}
        {...field}
        id={inputId}
        ref={composeRefs(ref, field?.ref)}
        invalid={invalid}
        disabled={disabled}
      />
    </Field>
  )
}

const _TextInput = forwardRef(TextInput)

export { _TextInput as TextInput }
export type { Props as TextInputProps }