import React, { cloneElement, forwardRef } from 'react'

import NextLink from 'next/link'

import { Text } from '../text'

import type { LinkProps } from 'next/link'
import type { ReactElement, Ref } from 'react'

interface BaseProps<Routes> extends Omit<LinkProps, 'passHref'> {
  href: Routes
  external?: boolean
}

interface Props<Routes> extends BaseProps<Routes> {
  children: ReactElement | string
  className?: string
}

const Link = <Routes extends string>(
  props: Props<Routes>,
  ref: Ref<HTMLAnchorElement>
) => {
  const { children, external, className, ...linkProps } = props

  const externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <NextLink {...linkProps} passHref>
      {typeof children === 'string' ? (
        <Text as="a" ref={ref} className={className} {...externalProps}>
          {children}
        </Text>
      ) : (
        cloneElement(children, externalProps)
      )}
    </NextLink>
  )
}

const _Link = forwardRef(Link)

export { _Link as Link }
export type { BaseProps as LinkProps }
