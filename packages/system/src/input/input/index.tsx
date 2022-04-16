import { forwardRef, useRef } from 'react'

import { composeRefs } from '@radix-ui/react-compose-refs'

import type { InputHTMLAttributes, Ref } from 'react'

interface Props {
  name?: string
  type?: 'text' | 'search' | 'url' | 'tel' | 'email' | 'password'
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  invalid?: boolean
  className?: string
  id?: string
  /* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautocomplete */
  autoComplete?: string
  autoFocus?: boolean
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

const Input = (props: Props, ref: Ref<HTMLInputElement>) => {
  const { id, required, disabled, readOnly, invalid, className } = props

  const domRef = useRef<HTMLInputElement>(null)
  // const { inputProps } = useTextField(
  //   {
  //     ...props,
  //     isDisabled: disabled,
  //     isReadOnly: readOnly,
  //     isRequired: required,
  //     validationState: invalid ? 'invalid' : 'valid',
  //   },
  //   domRef
  // )

  return (
    <input
      {...(props as InputHTMLAttributes<HTMLInputElement>)}
      id={id}
      ref={composeRefs(domRef, ref)}
      className={className}
    />
  )
}

const _Input = forwardRef(Input)

export { _Input as Input }
export type { Props as InputProps }
