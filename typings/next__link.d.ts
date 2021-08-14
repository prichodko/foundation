declare module 'next/link' {
  export type Routes = '/' | '/login' | '/get-started' | '/dashboard'

  export type LinkProps = {
    href: Routes
    as?: Routes
    replace?: boolean
    scroll?: boolean
    shallow?: boolean
    passHref?: boolean
    prefetch?: boolean
    locale?: string | false
  }

  export default function Link(
    props: React.PropsWithChildren<LinkProps>
  ): React.DetailedReactHTMLElement<
    {
      onMouseEnter?: React.MouseEventHandler<Element> | undefined
      onClick: React.MouseEventHandler
      href?: string | undefined
      ref?: any
    },
    HTMLElement
  >
}
