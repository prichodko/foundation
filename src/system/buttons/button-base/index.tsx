import { useButton } from '@react-aria/button'
import type { AriaButtonProps } from '@react-types/button'
import { forwardRef, Ref, useImperativeHandle } from 'react'
import { useRef } from 'react'

interface Props extends AriaButtonProps {
  className?: string
}

const ButtonBase = (props: Props, ref: Ref<HTMLButtonElement>) => {
  const domRef = useRef<HTMLButtonElement>(null)

  const { buttonProps } = useButton({ ...props }, domRef)

  useImperativeHandle(ref, () => domRef.current!)

  return (
    <button ref={domRef} {...buttonProps} className={props.className}>
      {props.children}
    </button>
  )
}

const _ButtonBase = forwardRef(ButtonBase)
export { _ButtonBase as ButtonBase }
export type { Props as ButtonBaseProps }
