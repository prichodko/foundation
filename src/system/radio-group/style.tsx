import * as RadioGroup from '@radix-ui/react-radio-group'
import { styled } from 'stitches.config'

export const Root = styled(RadioGroup.Root, {})

export const Item = styled(RadioGroup.Item, {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 19,
  width: 19,
  flexShrink: 0,
  border: '2px solid $gray8',
  borderRadius: '$full',
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

  '&[aria-checked="true"]': {
    borderColor: '$gray12',

    '&:hover': {
      borderColor: '$gray12',
    },
  },
})

export const Indicator = styled(RadioGroup.Indicator, {
  width: 9,
  height: 9,
  background: '$gray12',
  borderRadius: '$full',
})
