import * as Checkbox from '@radix-ui/react-checkbox'
import { styled } from 'stitches.config'

export const Root = styled(Checkbox.Root, {
  height: 19,
  width: 19,
  flexShrink: 0,
  border: '2px solid $gray8',
  borderRadius: 4,
  color: '$gray1',
  background: '$gray2',
  transition: '$colors',
  outline: 'none',

  '&:hover': {
    borderColor: '$gray9',
  },

  '&:focus': {
    ring: 2,
  },

  '&[aria-invalid="true"]': {
    borderColor: '$red8',

    '&:hover': {
      borderColor: '$gray8',
    },
  },

  '&[aria-checked="true"]': {
    background: '$gray12',
    borderColor: '$gray12',

    '&:hover': {
      borderColor: '$gray12',
    },
  },

  '&:disabled': {
    cursor: 'not-allowed',
    background: '$gray2',
    borderColor: '$gray6',

    '&:hover': {
      borderColor: '$gray6',
    },
  },
})

export const Indicator = styled(Checkbox.Indicator, {
  width: '100%',
  height: '100%',
})
