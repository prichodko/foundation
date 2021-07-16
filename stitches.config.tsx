import {
  gray,
  blue,
  red,
  green,
  yellow,
  grayDark,
  blueDark,
  redDark,
  greenDark,
  yellowDark,
} from '@radix-ui/colors'
import { createCss } from '@stitches/react'

const { styled, css, getCssString, theme, global } = createCss({
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#fff',
      black: '#000',

      ...gray,
      ...blue,
      ...red,
      ...green,
      ...yellow,

      'app-bg': '$gray1',

      'button-default-background': '$gray12',
      'button-default-text': '$gray1',
      'button-default-border': '$gray12',

      'button-outline-background': '$gray1',
      'button-outline-text': '$gray12',
      'button-outline-border': '$gray12',

      'button-minimal-background': '$gray1',
      'button-minimal-text': '$gray12',
      'button-minimal-border': '$transparent',

      'button-danger-background': '$red9',
      'button-danger-background-hover': '$red10',
      'button-danger-text': '#fff',
      'button-danger-border': '$red9',
    },

    fonts: {
      sans: 'Inter',
    },

    fontSizes: {
      small: '12px',
      default: '16px',
    },

    fontWeights: {
      400: '400',
      600: '600',
    },
  },
  utils: {
    ring: () => (value: number) => ({
      // boxShadow: `0 0 0 calc(3px + var(--tw-ring-offset-width)) ${value}`,
      boxShadow: `0 0 0 3px var(--colors-app-bg), 0 0 0 calc(${
        3 + value
      }px) rgba(21, 156, 228, 1)`,
    }),
  },
})

const darkTheme = theme('dark', {
  colors: {
    ...grayDark,
    ...blueDark,
    ...redDark,
    ...greenDark,
    ...yellowDark,
  },
})

export { darkTheme, styled, getCssString, global, css }
