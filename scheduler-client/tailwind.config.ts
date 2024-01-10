/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',

  ],
  theme: {
    extend: {
      animation: {
        'slide-up': 'slideUp 0.5s forwards',
        'slide-down': 'slideDown 0.5s forwards'
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideDown: {
          '100%': { transform: 'translateY(100%)' },
          '0%': { transform: 'translateY(0)' },
        }
      },
      colors: {
        primary: '#7856ff'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),

  ],
}