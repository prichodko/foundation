import * as RadioGroup from '@radix-ui/react-radio-group'

import { styled, theme } from '~/styles/config'

export const Root = styled(RadioGroup.Root, {
  display: 'flex',

  '&[aria-disabled="true"]': {
    borderColor: theme.colors.red8,

    '&:hover': {
      borderColor: theme.colors.gray8,
    },
  },

  '&[aria-invalid="true"]': {
    borderColor: theme.colors.red8,

    '&:hover': {
      borderColor: theme.colors.gray8,
    },
  },

  variants: {
    orientation: {
      vertical: {
        flexDirection: 'column',
      },
      horizontal: {
        flexDirection: 'row',
      },
    },
  },

  defaultVariants: {
    orientation: 'vertical',
  },
})

export const Item = styled(RadioGroup.Item, {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 19,
  width: 19,
  flexShrink: 0,
  border: `2px solid ${theme.colors.gray8}`,
  borderRadius: theme.radii.full,
  color: theme.colors.gray1,
  background: theme.colors.gray2,
  // transition: $colors,

  '&:hover': {
    borderColor: theme.colors.gray9,
  },

  '&[aria-checked="true"]': {
    borderColor: theme.colors.gray12,

    '&:hover': {
      borderColor: theme.colors.gray12,
    },
  },
})

export const Indicator = styled(RadioGroup.Indicator, {
  width: 9,
  height: 9,
  background: theme.colors.gray12,
  borderRadius: theme.radii.full,
})
