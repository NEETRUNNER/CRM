/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        firaMono: ['Fira Mono', 'monospace'],
        raleway: ['Raleway', 'sans-serif'],
        exo2: ['Exo_2', 'sans-serif'],
        plex: ['IBM Plex Sans'],
        mulish: ['Mulish'],
        libre: ['Libre franklin']
      },
    },
    screens: {
      'xs': '320px', // добавление кастомного брейкпоинта
      'xm': '480px',
      'md': '768px', // Средние экраны
      'lg': '1024px', // Большие экраны
      'xl': '1280px', // Очень большие экраны
      '2xl': '1536px', // Экстра большие экраны
    }
  },
  plugins: [require('tailwind-hamburgers')]
}