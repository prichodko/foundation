// @ts-nocheck
import type { Ref } from 'react'
import { forwardRef } from 'react'

import { composeRefs } from '@radix-ui/react-compose-refs'
import { useId } from '@radix-ui/react-id'

import type { FieldProps } from '~/system/field'
import { Field } from '~/system/field'
import type { FormFieldProps } from '~/system/form'
import { useField } from '~/system/form'

import type { InputProps } from '../input'
import { Input } from '../text-input/style'

interface Props extends InputProps, FieldProps, FormFieldProps {}

const Textarea = (props: Props, ref: Ref<HTMLTextAreaElement>) => {
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
        as="textarea"
        {...props}
        {...field}
        id={inputId}
        ref={composeRefs(ref, field?.ref)}
        value={value}
        onChange={onChange}
        invalid={invalid}
        disabled={disabled}
        aria-label="TODO"
      />
    </Field>
  )
}

const _Textarea = forwardRef(Textarea)

export { _Textarea as Textarea }
export type { Props as TextareaProps }
