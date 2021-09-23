import type { Ref } from 'react'
import { forwardRef } from 'react'

import { Link } from '~/components/link'
import type { LinkProps as BaseLinkProps } from '~/components/link'
import type { VariantProps } from '~/styles/config'

import type { BaseButtonProps } from '..'

import { Root } from './style'

interface BaseProps {
  children: React.ReactNode
  variant?: VariantProps<typeof Root>['variant']
  width?: VariantProps<typeof Root>['width']
}

interface ButtonProps extends BaseProps, BaseButtonProps {
  loading?: boolean
}

interface LinkProps extends BaseProps, BaseLinkProps {
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

  const { disabled, loading, children, ...buttonProps } = props

  return (
    <Root
      {...buttonProps}
      ref={ref}
      disabled={disabled || loading}
      loading={loading}
    >
      {loading && (
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
      )}
      {children}
    </Root>
  )
}

const _Button = forwardRef(Button)

export { _Button as Button }
export type { Props as ButtonProps }
