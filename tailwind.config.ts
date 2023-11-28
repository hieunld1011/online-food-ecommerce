import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        grayColor: '#f6f6f6',
        redColor: '#bc2634',
        greenColor:"#209f2e",
        yellowColor: '#f8c600',
        invalidColor: '#db3c36',
        linkColor: '#0056b3',
      },
      backgroundColor: {
        headerBg: '#1e1e20',
        yellowBg: '#f8c600',
        greenBg: '#209f2e',
        grayBg: '#eee',
        redBg: '#bc2634',
      },
      boxShadow: {
        type1: '0px 0px 15px 0px rgba(0,0,0,0.08)',
      },
      borderColor: {
        grayBorder: '#e5e5e5',
        yellowBorder: '#f8c600',
        greenBorder: '#209f2e',
        invalidColor: '#db3c36',
      },
      animation: {
        'float-bob': 'bounce 2s linear infinite',
        slideIn: 'slideIn .5s ease-in-out'
      },
      keyframes: {
        slideIn: {
          '0%': { height: '0', opactiy: '0' },
          '100%': { height: '285px', opacity: '100' },
        },
      },
    },
  },
  plugins: [],
};
export default config;

