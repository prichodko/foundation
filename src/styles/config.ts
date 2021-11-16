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
import { createStitches } from '@stitches/react'
import type * as Stitches from '@stitches/react'

const { styled, css, getCssText, createTheme, globalCss, config, theme } =
  createStitches({
    media: {
      sm: '(min-width: 640px)',
      md: '(min-width: 768px)',
      lg: '(min-width: 1024px)',
      xl: '(min-width: 1280px)',
      '2xl': '(min-width: 1536px)',
    },
    theme: {
      fonts: {
        sans: 'Inter, -apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif',
        mono: 'Orbitron, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      },

      fontSizes: {
        10: '0.625rem',
        12: '0.75rem',
        14: '0.875rem',
        16: '1rem',
        20: '1.25rem',
        24: '1.5rem',
        32: '2rem',
        48: '3rem',
        64: '4rem',
      },

      fontWeights: {
        400: '400',
        500: '500',
        600: '600',
      },

      colors: {
        ...gray,
        ...blue,
        ...red,
        ...green,
        ...yellow,

        text: '$gray12',
        background: '#fff',
        backgroundOverlay: '$gray2',
        primary: '$gray12',
        secondary: '$gray11',
        accent: '',
        highlight: '',
        muted: '',
        border: '$gray6',

        transparent: 'transparent',
        current: 'currentColor',
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

      radii: {
        full: '100%',
        overlay: '6px',
        element: '4px',
      },

      transitions: {
        colors:
          'background-color cubic-bezier(0.4, 0, 0.2, 1) 150ms, border-color cubic-bezier(0.4, 0, 0.2, 1) 150ms, color cubic-bezier(0.4, 0, 0.2, 1) 150ms, fill cubic-bezier(0.4, 0, 0.2, 1) 150ms, stroke cubic-bezier(0.4, 0, 0.2, 1) 150ms',
      },
    },
  })

const darkTheme = createTheme('dark', {
  colors: {
    ...grayDark,
    ...blueDark,
    ...redDark,
    ...greenDark,
    ...yellowDark,
    background: '#000',
  },
})

export { theme, styled, getCssText, globalCss, css, darkTheme }

export type CSS = Stitches.CSS<typeof config>
export type { VariantProps } from '@stitches/react'
