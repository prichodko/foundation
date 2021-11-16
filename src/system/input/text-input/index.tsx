import type { Ref } from 'react'
import { forwardRef } from 'react'

import { composeRefs } from '@radix-ui/react-compose-refs'
import { useId } from '@radix-ui/react-id'

import type { FieldProps } from '~/system/field'
import { Field } from '~/system/field'
import type { FormFieldProps } from '~/system/form'
import { useField } from '~/system/form'

import type { InputProps } from '../input'

import { Input } from './style'

interface Props extends InputProps, FieldProps, FormFieldProps {}

const TextInput = (props: Props, ref: Ref<HTMLInputElement>) => {
  const { label, error } = props

  const { field, fieldState, formState } = useField(props)

  const value = props.value ?? field?.value
  const onChange = props.onChange ?? field?.onChange
  const invalid = props.invalid || Boolean(error) || fieldState?.invalid
  const disabled = props.disabled || formState?.isSubmitting

  const inputId = useId()
  const errorMessage = fieldState?.error?.message ?? error

  return (
    <Field htmlFor={inputId} label={label} error={errorMessage}>
      <Input
        {...props}
        {...field}
        id={inputId}
        ref={composeRefs(ref, field?.ref)}
        value={value}
        onChange={onChange}
        invalid={invalid}
        disabled={disabled}
      />
    </Field>
  )
}

const _TextInput = forwardRef(TextInput)

export { _TextInput as TextInput }
export type { Props as TextInputProps }
