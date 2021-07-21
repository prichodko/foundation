import { useId } from '@radix-ui/react-id'
import { forwardRef, Ref } from 'react'

import { Field, FieldProps } from '../field'
import type { InputBaseProps } from './input-base'
import { Input, Error } from './style'

interface Props extends InputBaseProps, FieldProps {
  // value: string
  // onChange: (value: string) => void
  error?: string
}

const TextInput = (props: Props, ref: Ref<HTMLInputElement>) => {
  const { error } = props

  const errorId = useId()

  return (
    <Field>
      <Input
        ref={ref}
        {...props}
        invalid={props.invalid || Boolean(error)}
        aria-errormessage={error && errorId}
      />
      {error && <Error id={errorId}>{error}</Error>}
    </Field>
  )
}

const _TextInput = forwardRef(TextInput)

export { _TextInput as TextInput }
export type { Props as TextInputProps }
