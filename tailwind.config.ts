import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'opengrad': {
          'dark-teal': '#034852',
          'deep-teal': '#006d6c',
          'medium-green': '#209379',
          'vibrant-green': '#0abe62',
          'light-lime': '#a6db74',
          'bright-yellow': '#ffde00',
          'soft-yellow': '#ffde59',
        },
        teal: {
          600: '#006d6c',
          700: '#034852',
        },
        green: {
          600: '#0abe62',
          700: '#0a9954',
          800: '#087a42',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          '"Helvetica Neue"',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};

export default config;
