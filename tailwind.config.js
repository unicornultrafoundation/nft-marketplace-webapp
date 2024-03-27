/** @type {import('tailwindcss').Config} */
const { colors, typography } = require('./config/theme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/flowbite-react/**/*.js'
  ],
  theme: {
    extend: {
      screens: {
        mobile: '480px',
        tablet: '768px',
        laptop: '1080px',
        desktop: '1440px'
      },
      colors: {
        ...colors,
        primary: colors.gray[800],
        secondary: colors.gray[600],
        tertiary: colors.gray[400],
        disabled: colors.gray[200]
      },
      backgroundColor: {
        'surface-soft': colors.gray[100],
        'surface-medium': colors.gray[200],
        'surface-hard': colors.gray[500],
        button: colors.gray[900],
        'button-secondary': colors.gray[100],
        tab: colors.gray[0]
      },
      borderColor: {
        primary: colors.gray[800],
        secondary: colors.gray[600],
        tertiary: colors.gray[400],
        disabled: colors.gray[200],
        hard: colors.gray[500],
        soft: colors.gray[100],
        medium: colors.gray[200],
      },
      fontSize: {
        ...typography
      }
    }
  },
  plugins: [
    require('flowbite/plugin')
  ]
}

