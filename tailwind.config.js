import colors from 'tailwindcss/colors';

export const content = ['./src/**/*.{js,jsx,ts,tsx}'];
export const theme = {
  extend: {},
  fontFamily: {
    sans: ['Helvetica', 'Arial', 'sans-serif'],
    roboto: ['Roboto', 'sans-serif'],
  },
  colors: {
    bigbuy: {
      yellow: '#FFCE33',
      blue: '#0090ff',
    },
    transparent: 'transparent',
    current: 'currentColor',
    black: colors.black,
    white: colors.white,
    gray: colors.gray,
    emerald: colors.emerald,
    indigo: colors.indigo,
    yellow: colors.yellow,
  },
};
export const plugins = [];
