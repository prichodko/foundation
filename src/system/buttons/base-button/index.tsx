import type { Ref } from 'react'
import { useRef, forwardRef } from 'react'

import { composeRefs } from '@radix-ui/react-compose-refs'
import { useButton } from '@react-aria/button'
import type { PressEvents, PressEvent } from '@react-types/shared'

interface Props extends PressEvents {
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
  autoFocus?: boolean
  onClick?: (e: PressEvent) => void
}

const BaseButton = (props: Props, ref: Ref<HTMLButtonElement>) => {
  const { children, className, onClick, ...rest } = props

  const domRef = useRef<HTMLButtonElement>(null)

  const { buttonProps } = useButton(
    { isDisabled: props.disabled, onPress: onClick, ...rest },
    domRef
  )

  return (
    <button
      {...buttonProps}
      ref={composeRefs(domRef, ref)}
      className={className}
    >
      {children}
    </button>
  )
}

const _BaseButton = forwardRef(BaseButton)

export { _BaseButton as BaseButton }
export type { Props as BaseButtonProps }
