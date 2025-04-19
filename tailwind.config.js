/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF3737',
        secondary: '#483CFF',
        dark: {
          900: '#101318',
          800: '#2B333F',
        },
        gray: {
          700: '#62738D',
          400: '#B9CADB',
          200: '#E0E4EC',
          100: '#F2F4F8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Sora', 'sans-serif'],
      },
      fontSize: {
        h1: ['56px', { lineHeight: '72px', fontWeight: '500' }],
        h2: ['32px', { lineHeight: '48px', fontWeight: '700' }],
        h3: ['28px', { lineHeight: '40px', fontWeight: '700' }],
        h4: ['24px', { lineHeight: '32px', fontWeight: '700' }],
        h5: ['20px', { lineHeight: '32px', fontWeight: '700' }],
        h6: ['18px', { lineHeight: '24px', fontWeight: '700' }],
        p1: ['18px', { lineHeight: '24px', fontWeight: '400' }],
        p2: ['16px', { lineHeight: '24px', fontWeight: '400' }],
        p3: ['14px', { lineHeight: '16px', fontWeight: '400' }],
        caption1: ['12px', { lineHeight: '16px', fontWeight: '500' }],
        caption2: ['10px', { lineHeight: '16px', fontWeight: '500' }],
      },
    },    
  },
  plugins: [],
}
