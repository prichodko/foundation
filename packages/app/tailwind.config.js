const theme = require('tailwindcss/defaultTheme')

/**
 * @type {typeof import("tailwindcss/stubs/defaultConfig.stub") }
 */
const config = {
  content: ['./src/**/*.{jsx,tsx}', './pages/**/*.{jsx,tsx}'],
  corePlugins: {
    // preflight: false,
  },
  theme: {
    fontFamily: {
      sans: 'var(--fonts-sans)',
    },
    fontSize: {
      12: 'var(--fontSizes-12)',
      14: 'var(--fontSizes-14)',
      16: 'var(--fontSizes-16)',
      20: 'var(--fontSizes-20)',
      24: 'var(--fontSizes-24)',
      32: 'var(--fontSizes-32)',
      48: 'var(--fontSizes-48)',
      64: 'var(--fontSizes-64)',
    },
    fontWeight: {
      400: 'var(--fontWeights-400)',
      500: 'var(--fontWeights-500)',
      600: 'var(--fontWeights-600)',
    },
    textColor: {
      DEFAULT: 'var(--colors-gray12)',
      low: 'var(--colors-gray11)',
      red: 'var(--colors-red11)',
      green: 'var(--colors-green11)',
      yellow: 'var(--colors-yellow11)',
      blue: 'var(--colors-blue11)',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      gray: {
        1: 'var(--colors-gray1)',
        2: 'var(--colors-gray2)',
        3: 'var(--colors-gray3)',
        4: 'var(--colors-gray4)',
        5: 'var(--colors-gray5)',
        6: 'var(--colors-gray6)',
        7: 'var(--colors-gray7)',
        8: 'var(--colors-gray8)',
        9: 'var(--colors-gray9)',
        10: 'var(--colors-gray10)',
        11: 'var(--colors-gray11)',
        12: 'var(--colors-gray12)',
      },
      blue: {
        1: 'var(--colors-blue1)',
        2: 'var(--colors-blue2)',
        3: 'var(--colors-blue3)',
        4: 'var(--colors-blue4)',
        5: 'var(--colors-blue5)',
        6: 'var(--colors-blue6)',
        7: 'var(--colors-blue7)',
        8: 'var(--colors-blue8)',
        9: 'var(--colors-blue9)',
        10: 'var(--colors-blue10)',
        11: 'var(--colors-blue11)',
        12: 'var(--colors-blue12)',
      },
      red: {
        1: 'var(--colors-red1)',
        2: 'var(--colors-red2)',
        3: 'var(--colors-red3)',
        4: 'var(--colors-red4)',
        5: 'var(--colors-red5)',
        6: 'var(--colors-red6)',
        7: 'var(--colors-red7)',
        8: 'var(--colors-red8)',
        9: 'var(--colors-red9)',
        10: 'var(--colors-red10)',
        11: 'var(--colors-red11)',
        12: 'var(--colors-red12)',
      },
      green: {
        1: 'var(--colors-green1)',
        2: 'var(--colors-green2)',
        3: 'var(--colors-green3)',
        4: 'var(--colors-green4)',
        5: 'var(--colors-green5)',
        6: 'var(--colors-green6)',
        7: 'var(--colors-green7)',
        8: 'var(--colors-green8)',
        9: 'var(--colors-green9)',
        10: 'var(--colors-green10)',
        11: 'var(--colors-green11)',
        12: 'var(--colors-green12)',
      },
      yellow: {
        1: 'var(--colors-yellow1)',
        2: 'var(--colors-yellow2)',
        3: 'var(--colors-yellow3)',
        4: 'var(--colors-yellow4)',
        5: 'var(--colors-yellow5)',
        6: 'var(--colors-yellow6)',
        7: 'var(--colors-yellow7)',
        8: 'var(--colors-yellow8)',
        9: 'var(--colors-yellow9)',
        10: 'var(--colors-yellow10)',
        11: 'var(--colors-yellow11)',
        12: 'var(--colors-yellow12)',
      },
    },
    borderColor: theme => ({
      ...theme('colors'),
      DEFAULT: theme('colors.gray.6', 'currentColor'),
    }),
  },
}

module.exports = config
