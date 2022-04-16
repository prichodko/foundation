import * as Tabs from '@radix-ui/react-tabs'

import { styled, theme } from '../config'

export const Root = styled(Tabs.Root, {})

export const List = styled(Tabs.List, {
  display: 'flex',
  borderBottom: `1px solid ${theme.colors.border}`,
})

export const Trigger = styled(Tabs.Trigger, {
  flex: 1,
  padding: '4px 16px',
  fontSize: theme.fontSizes[14],
  borderBottom: `2px solid ${theme.colors.transparent}`,
  textAlign: 'center',
  color: theme.colors.gray11,
  cursor: 'default',
  userSelect: 'none',

  '&:hover': {
    color: theme.colors.gray12,
  },

  "&[aria-selected='true']": {
    borderColor: theme.colors.gray12,
    color: theme.colors.gray12,
  },
})

export const Content = styled(Tabs.Content, {})
