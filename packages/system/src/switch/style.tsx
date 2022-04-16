import * as Switch from '@radix-ui/react-switch'

import { styled, theme } from '../config'

export const Root = styled(Switch.Root, {
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  flexShrink: 0,
  height: 20,
  width: 34,
  background: theme.colors.gray4,
  borderRadius: 25,
  // transition: '$colors',

  '&:hover': {
    background: theme.colors.gray5,
  },

  '&[aria-checked="true"]': {
    background: theme.colors.gray12,
  },

  '&:disabled': {
    background: theme.colors.gray8,
    color: theme.colors.gray11,
    borderColor: theme.colors.gray6,

    '&:hover': {
      background: theme.colors.gray8,
      color: theme.colors.gray11,
      borderColor: theme.colors.gray6,
      cursor: 'not-allowed',
    },
  },
})

export const Thumb = styled(Switch.Thumb, {
  display: 'block',
  width: 14,
  height: 14,
  backgroundColor: 'white',
  borderRadius: theme.radii.full,
  border: `1px solid ${theme.colors.gray7}`,
  transition: 'transform 100ms',
  transform: 'translateX(3px)',
  willChange: 'transform',
  pointerEvents: 'none',

  '&[data-state="checked"]': {
    transform: 'translateX(17px)',
  },
})
