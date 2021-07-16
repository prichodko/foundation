import * as Tabs from '@radix-ui/react-tabs'
import { styled } from 'stitches.config'

export const Root = styled(Tabs.Root, {})

export const List = styled(Tabs.List, {
  display: 'flex',
  borderBottom: '1px solid $gray6',
})

export const Trigger = styled(Tabs.Trigger, {
  flex: 1,
  paddingX: 4,
  paddingY: 16,
  fontSize: '$default',
  borderBottom: '2px solid $transparent',
  textAlign: 'center',
  color: '$gray11',
  outline: 'none',

  '&:focus': {
    ring: 2,
  },

  "&[aria-selected='true']": {
    borderColor: '$gray12',
    color: '$gray12',
  },
})

export const Content = styled(Tabs.Content, {})
