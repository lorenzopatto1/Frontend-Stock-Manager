/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.tsx'],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        brand: {
          300: '#996DFF',
          500: '#7c3aed',
        },
      },
      borderRadius: {
        md: '4px',
      },
      fonts: {},
    },
  }
}

