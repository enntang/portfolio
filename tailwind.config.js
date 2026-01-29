/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'mobile': {'max': '768px'},
      },
      fontFamily: {
        sans: ['Lexend', '"Noto Sans TC"', 'sans-serif'],
        'lexend-exa': ['"Lexend Exa"', 'Lexend', '"Noto Sans TC"', 'sans-serif'],
      },
      colors: {
        // Custom highlight and background colors
        highlight: '#CCEB6F',
        bg: '#F4F5F8',
        
        // Gray color scale
        white: '#fff',
        gray: {
          100: '#E3EBFF',
          200: '#CBD9FC',
          300: '#B8C5E8',
          400: '#A5B2D4',
          500: '#929FC1',
          600: '#808DAE',
          700: '#5E6988',
          800: '#3D4865',
          900: '#2E3854',
        },
        black: '#000',
      },
      fontSize: {
        // General styles (no device-specific variants)
        'p': ['16px', { lineHeight: '160%', fontWeight: '300', letterSpacing: '0.05em' }], // General paragraph - Light weight, 5% letter spacing
        'p-strong': ['18px', { lineHeight: '160%', fontWeight: '500', letterSpacing: '0.05em' }], // Strong paragraph - Medium weight, 5% letter spacing
        'caption': ['14px', { lineHeight: 'auto', fontWeight: '300', letterSpacing: '0' }], // Caption text - Light weight, 0% letter spacing
        
        // Desktop styles
        'large': ['80px', { lineHeight: '120%', fontWeight: '500', fontFamily: '"Lexend", Lexend, "Noto Sans TC", sans-serif' }], // Desktop large text
        'h1': ['32px', { lineHeight: '150%', fontWeight: '700', fontFamily: '"Lexend Exa", Lexend, "Noto Sans TC", sans-serif' }], // Desktop h1
        'h2': ['28px', { lineHeight: '150%', fontWeight: '700', fontFamily: '"Lexend Exa", Lexend, "Noto Sans TC", sans-serif' }], // Desktop h2
        'h3': ['18px', { lineHeight: '150%', fontWeight: '500', fontFamily: '"Lexend Exa", Lexend, "Noto Sans TC", sans-serif' }], // Desktop h3
        
        // Mobile styles (will be overridden by responsive utilities)
        'large-mobile': ['60px', { lineHeight: '120%', fontWeight: '500', fontFamily: '"Lexend", Lexend, "Noto Sans TC", sans-serif' }], // Mobile large text
        'h2-mobile': ['22px', { lineHeight: '150%', fontWeight: '700', fontFamily: '"Lexend Exa", Lexend, "Noto Sans TC", sans-serif' }], // Mobile h2 (same as desktop)
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

