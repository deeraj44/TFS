/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F9F6F0',
        brown: '#4A3525',
        gold: '#D4A373',
        olive: '#6B705C',
        clay: '#8C6A52',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(74, 53, 37, 0.25)',
      },
    },
  },
  plugins: [],
};
