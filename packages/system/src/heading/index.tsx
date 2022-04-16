import { forwardRef } from 'react'

import { Element } from './style'

import type { CSS, VariantProps } from '../config'
import type { Ref } from 'react'

interface Props extends VariantProps<typeof Element> {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
  className?: string
  css?: CSS
}

const TAGS = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
} as const

const Heading = (props: Props, ref: Ref<HTMLHeadingElement>) => {
  const { children, level = 2, ...headingProps } = props

  const tag = TAGS[level]

  return (
    <Element as={tag} ref={ref} {...headingProps}>
      {children}
    </Element>
  )
}

const _Heading = forwardRef(Heading)

export { _Heading as Heading }
export type { Props as HeadingProps }
