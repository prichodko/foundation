import * as Switch from '@radix-ui/react-switch'
import { styled } from 'stitches.config'

export const Root = styled(Switch.Root, {
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  flexShrink: 0,
  height: 24,
  width: 40,
  background: '$gray3',
  borderRadius: 25,
  transition: '$colors',

  '&:hover': {
    background: '$gray4',
  },

  '&[aria-checked="true"]': {
    background: '$gray12',
  },
})

export const Thumb = styled(Switch.Thumb, {
  display: 'block',
  width: 18,
  height: 18,
  backgroundColor: 'white',
  borderRadius: '$full',
  border: '1px solid $gray6',
  transition: 'transform 100ms',
  transform: 'translateX(3px)',
  willChange: 'transform',
  pointerEvents: 'none',

  '&[data-state="checked"]': {
    transform: 'translateX(19px)',
  },
})
