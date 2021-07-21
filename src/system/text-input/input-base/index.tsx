import { useTextField } from '@react-aria/textfield'
import type { AriaTextFieldProps } from '@react-types/textfield'
import { forwardRef, Ref, useImperativeHandle } from 'react'
import { InputHTMLAttributes, useRef } from 'react'

interface Props
  extends Omit<AriaTextFieldProps, 'isRequired' | 'isDisabled' | 'isReadOnly'> {
  type?: 'text' | 'search' | 'url' | 'tel' | 'email' | 'password'
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  invalid?: boolean
  className?: string
}

const InputBase = (props: Props, ref: Ref<HTMLInputElement>) => {
  const { required, disabled, readOnly, invalid, className } = props

  const domRef = useRef<HTMLInputElement>(null)
  const { inputProps } = useTextField(
    {
      ...props,
      isDisabled: disabled,
      isReadOnly: readOnly,
      isRequired: required,
      validationState: invalid ? 'invalid' : 'valid',
    },
    domRef
  )

  useImperativeHandle(ref, () => domRef.current!)

  return (
    <input
      className={className}
      {...(inputProps as InputHTMLAttributes<HTMLInputElement>)}
    />
  )
}

const _InputBase = forwardRef(InputBase)

export { _InputBase as InputBase }
export type { Props as InputBaseProps }
