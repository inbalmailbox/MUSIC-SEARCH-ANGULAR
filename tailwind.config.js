module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
          brand: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5', 
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81'
        },
        
        mint:  { 100: '#e9fbf6', 500: '#3ac3a3' },
        peach: { 100: '#fff3ea', 500: '#ff9f6e' },
        sky:   { 100: '#eef6ff', 500: '#6aa8ff' },
      },
      borderRadius: {
        xl2: '1.25rem', 
      },
      boxShadow: {
        
        card: '0 8px 24px rgba(15, 23, 42, 0.06)',
        cardHover: '0 12px 28px rgba(15, 23, 42, 0.10)',
      },
    },
  },
  plugins: [],
};
