import type { ReactElement, Ref } from 'react'
import React, { cloneElement, forwardRef } from 'react'

import NextLink from 'next/link'
import type { LinkProps } from 'next/link'

interface Props extends LinkProps {
  children: ReactElement | string
  external?: boolean
  className?: string
}

const Link = (props: Props, ref: Ref<HTMLAnchorElement>) => {
  const { children, external, className, ...linkProps } = props

  const externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <NextLink {...linkProps} passHref>
      {typeof children === 'string' ? (
        <a ref={ref} className={className} {...externalProps}>
          {children}
        </a>
      ) : (
        cloneElement(children, externalProps)
      )}
    </NextLink>
  )
}

const _Link = forwardRef(Link)
export { _Link as Link }
export type { Props as LinkProps }
