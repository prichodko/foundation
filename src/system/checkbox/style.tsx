import * as Checkbox from '@radix-ui/react-checkbox'

import { styled, theme } from '~/styles/config'

export const Root = styled(Checkbox.Root, {
  height: 19,
  width: 19,
  flexShrink: 0,
  borderRadius: theme.radii.element,
  color: theme.colors.gray1,
  background: theme.colors.gray2,
  // transition: theme.colors.colors,
  border: `2px solid ${theme.colors.gray7}`,

  '&:hover': {
    borderColor: theme.colors.gray8,
  },

  '&[aria-invalid="true"]': {
    borderColor: theme.colors.red8,

    '&:hover': {
      borderColor: theme.colors.gray8,
    },
  },

  '&[aria-checked="true"]': {
    background: theme.colors.gray12,
    borderColor: theme.colors.gray12,

    '&:hover': {
      borderColor: theme.colors.gray12,
    },
  },

  '&:disabled': {
    cursor: 'not-allowed',
    background: theme.colors.gray2,
    borderColor: theme.colors.gray6,

    '&:hover': {
      borderColor: theme.colors.gray6,
    },
  },
})

export const Indicator = styled(Checkbox.Indicator, {
  width: '100%',
  height: '100%',
})
