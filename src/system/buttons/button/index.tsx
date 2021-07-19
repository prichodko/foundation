import type { AriaBaseButtonProps } from '@react-types/button'
import type { PressEvents, FocusableProps } from '@react-types/shared'
import { Routes } from 'next/link'
import { ReactNode } from 'react'
import { forwardRef, Ref } from 'react'

import { Link } from '~/components/link'

import { Loader } from '../loader'
import { BaseButton } from './style'

interface BaseProps {
  children: ReactNode
  variant?: 'default' | 'outline' | 'minimal' | 'danger'
  width?: 'full'
}

interface ButtonProps
  extends BaseProps,
    PressEvents,
    FocusableProps,
    AriaBaseButtonProps {
  loading?: boolean
  disabled?: boolean
}

interface LinkProps extends BaseProps {
  href: Routes
  external?: boolean
}

type Props = ButtonProps | LinkProps

const Button = (props: Props, ref: Ref<HTMLButtonElement>) => {
  if ('href' in props) {
    const { href, children, external, ...linkProps } = props

    return (
      <Link href={href} external={external}>
        <BaseButton as="a" {...linkProps}>
          {children}
        </BaseButton>
      </Link>
    )
  }

  const { loading, disabled, children, ...buttonProps } = props

  return (
    <BaseButton ref={ref} isDisabled={disabled || loading} {...buttonProps}>
      {loading && <Loader />}
      {children}
    </BaseButton>
  )
}

const _Button = forwardRef(Button)
export { _Button as Button }
export type { Props as ButtonProps }
