/**
 * @type {typeof import("tailwindcss/stubs/defaultConfig.stub") }
 */
const config = {
  mode: 'jit',
  purge: ['./src/**/*.{jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        error: { DEFAULT: '#E00' },
      },
      cursor: {
        default: 'default',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}

module.exports = config
