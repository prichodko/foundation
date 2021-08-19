import type { ReactNode, Ref } from 'react'
import { forwardRef } from 'react'

import type { AriaBaseButtonProps } from '@react-types/button'
import type { PressEvents, FocusableProps } from '@react-types/shared'
import type { Routes } from 'next/link'

import { Link } from '~/components/link'

import { Root } from './style'

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
        <Root as="a" {...linkProps}>
          {children}
        </Root>
      </Link>
    )
  }

  const { loading, disabled, children, ...buttonProps } = props

  return (
    <Root
      {...buttonProps}
      ref={ref}
      isDisabled={disabled || loading}
      css={{ paddingLeft: loading ? 32 : undefined }}
    >
      {loading && <Loader />}
      {children}
    </Root>
  )
}

const Loader = () => (
  <svg
    className="animate-spin absolute left-[9px] top-[9px]"
    fill="none"
    viewBox="0 0 24 24"
    width={16}
    height={16}
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
)

const _Button = forwardRef(Button)

export { _Button as Button }
export type { Props as ButtonProps }
