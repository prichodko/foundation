import { forwardRef, useRef } from 'react'

import { composeRefs } from '@radix-ui/react-compose-refs'
import { useButton } from '@react-aria/button'

import type { PressEvent } from '@react-types/shared'
import type { Ref } from 'react'

interface Props {
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
  autoFocus?: boolean
  onPress?: (e: PressEvent) => void
  onClick?: () => void
}

const BaseButton = (props: Props, ref: Ref<HTMLButtonElement>) => {
  const { children, className, onClick, ...rest } = props

  const domRef = useRef<HTMLButtonElement>(null)

  const { buttonProps } = useButton(
    // @ts-ignore
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
