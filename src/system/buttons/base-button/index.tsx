import type { Ref } from 'react'
import { useRef, forwardRef } from 'react'

import { composeRefs } from '@radix-ui/react-compose-refs'
import { useButton } from '@react-aria/button'
import type { AriaButtonProps } from '@react-types/button'

interface Props extends AriaButtonProps {
  className?: string
}

const BaseButton = (props: Props, ref: Ref<HTMLButtonElement>) => {
  const domRef = useRef<HTMLButtonElement>(null)

  const { buttonProps } = useButton({ ...props }, domRef)

  return (
    <button
      {...buttonProps}
      ref={composeRefs(domRef, ref)}
      className={props.className}
    >
      {props.children}
    </button>
  )
}

const _BaseButton = forwardRef(BaseButton)

export { _BaseButton as BaseButton }
export type { Props as BaseButtonProps }
