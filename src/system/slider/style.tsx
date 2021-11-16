import * as Slider from '@radix-ui/react-slider'

import { styled, theme } from '~/styles/config'

export const Root = styled(Slider.Root, {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  userSelect: 'none',
  touchAction: 'none',
  width: 200,

  '&[data-orientation="horizontal"]': {
    height: 20,
  },

  '&[data-orientation="vertical"]': {
    flexDirection: 'column',
    width: 20,
    height: 100,
  },
})

export const Track = styled(Slider.Track, {
  backgroundColor: theme.colors.gray7,
  position: 'relative',
  flexGrow: 1,
  borderRadius: '9999px',

  '&[data-orientation="horizontal"]': { height: 3 },
  '&[data-orientation="vertical"]': { width: 3 },
})

export const Range = styled(Slider.Range, {
  position: 'absolute',
  backgroundColor: theme.colors.gray12,
  borderRadius: '9999px',
  height: '100%',
})

export const Thumb = styled(Slider.Thumb, {
  all: 'unset',
  display: 'block',
  width: 20,
  height: 20,
  backgroundColor: theme.colors.gray12,
  // boxShadow: `0 2px 10px ${blackA.blackA7}`,
  borderRadius: 10,
})
