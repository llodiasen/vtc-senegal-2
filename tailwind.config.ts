import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6eaf2',
          100: '#ccd5e6',
          200: '#99abcc',
          300: '#6681b3',
          400: '#335799',
          500: '#002d80',
          600: '#002060',
          700: '#001a4d',
          800: '#001333',
          900: '#000d1a',
        },
        secondary: {
          50: '#fff9e6',
          100: '#fff3cc',
          200: '#ffe799',
          300: '#ffdb66',
          400: '#ffcf33',
          500: '#ffc300',
          600: '#ffbf00',
          700: '#cc9900',
          800: '#997300',
          900: '#664d00',
        },
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};

export default config;
