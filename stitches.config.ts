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

// 1 App background
// 2 Subtle background
// 3 UI element background
// 4 Hovered UI element background.
// 5 Active / Selected UI element background.
// 6 Subtle borders and separators.
// 7 UI element border and focus rings
// 8 Hovered UI element border
// 9 Solid backgrounds.
// 10 Hovered solid backgrounds.
// 11 Low-contrast text.
// 12 High-contrast text.

const { styled, css, getCssString, theme, global } = createCss({
  media: {
    bp1: '(min-width: 640px)',

    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
    '2xl': '(min-width: 1536px)',
  },
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

      bg: '$gray1',
      text: '$gray12',

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

    space: {
      0: '0px',
      1: '4px',
      2: '8px',
      3: '16px',
      4: '24px',
      5: '32px',
      6: '64px',
      7: '128px',
      8: '256px',
      9: '512px',
    },

    fonts: {
      sans: 'Inter',
    },

    // 12, 14, 16, 20, 24, 32, 48, 64,
    fontSizes: {
      small: '12px',
      default: '16px',
    },

    fontWeights: {
      400: '400',
      600: '600',
    },

    radii: {
      full: '100%',
    },

    transitions: {
      colors:
        'background-color cubic-bezier(0.4, 0, 0.2, 1) 150ms, border-color cubic-bezier(0.4, 0, 0.2, 1) 150ms, color cubic-bezier(0.4, 0, 0.2, 1) 150ms, fill cubic-bezier(0.4, 0, 0.2, 1) 150ms, stroke cubic-bezier(0.4, 0, 0.2, 1) 150ms',
    },
  },

  utils: {
    ring: () => (value: number) => ({
      // boxShadow: `0 0 0 calc(3px + var(--tw-ring-offset-width)) ${value}`,
      boxShadow: `0 0 0 3px var(--colors-bg), 0 0 0 calc(${
        3 + value
      }px) rgba(21, 156, 228, 1)`,
    }),

    marginX:
      config =>
      (value: `$${keyof typeof config['theme']['space']}` | (string & {})) => ({
        marginLeft: value,
        marginRight: value,
      }),
    marginY:
      config =>
      (value: `$${keyof typeof config['theme']['space']}` | (string & {})) => ({
        marginTop: value,
        marginBottom: value,
      }),
    paddingX:
      config =>
      (value: `$${keyof typeof config['theme']['space']}` | (string & {})) => ({
        paddingLeft: value,
        paddingRight: value,
      }),
    paddingY:
      config =>
      (value: `$${keyof typeof config['theme']['space']}` | (string & {})) => ({
        paddingTop: value,
        paddingBottom: value,
      }),

    placeholder:
      config =>
      (
        value: `$${keyof typeof config['theme']['colors']}` | (string & {})
      ) => ({
        '&::placeholder': {
          color: value,
        },
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
