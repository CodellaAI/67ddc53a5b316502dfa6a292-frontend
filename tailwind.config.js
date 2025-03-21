
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#1DA1F2',
          dark: '#0C7ABF',
        },
        secondary: {
          dark: '#657786',
          light: '#AAB8C2',
          extraLight: '#E1E8ED',
          ultraLight: '#F5F8FA',
        },
        black: '#14171A',
      },
    },
  },
  plugins: [],
}
