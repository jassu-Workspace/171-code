
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{html,tsx,ts}',
  ],
  theme: {
    extend: {
      colors: {
        'royal-navy': {
          DEFAULT: '#0A192F',
          50: '#F0F4F8',
          100: '#D9E2EC',
          200: '#BCCCDC',
          300: '#9FB3C8',
          400: '#829AB1',
          500: '#627D98',
          600: '#486581',
          700: '#334E68',
          800: '#1E293B',
          900: '#0F172A',
          950: '#070D18',
        },
        'aureate-gold': {
          DEFAULT: '#C5A059',
          light: '#E2BC72',
          dark: '#8C6D2D',
          muted: '#D4AF37',
          dim: 'rgba(197, 160, 89, 0.15)',
        },
        'champagne': {
          base: '#F8FAFC',
          surface: '#FFFFFF',
          sub: '#F1F5F9',
          border: '#E2E8F0',
          hover: '#EEF2F6',
        },
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'Cambria', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'royal': '0 4px 20px -2px rgba(10, 25, 47, 0.06), 0 1px 3px 0 rgba(10, 25, 47, 0.03)',
        'royal-gold': '0 4px 20px -2px rgba(197, 160, 89, 0.2), 0 0 10px rgba(197, 160, 89, 0.15)',
        'royal-dark': '0 8px 30px -4px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
};

