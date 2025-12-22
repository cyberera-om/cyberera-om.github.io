/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cyra: {
          50: 'rgb(var(--cyra-50) / <alpha-value>)',
          100: 'rgb(var(--cyra-100) / <alpha-value>)',
          200: 'rgb(var(--cyra-200) / <alpha-value>)',
          300: 'rgb(var(--cyra-300) / <alpha-value>)',
          400: 'rgb(var(--cyra-400) / <alpha-value>)',
          500: 'rgb(var(--cyra-500) / <alpha-value>)',
          600: 'rgb(var(--cyra-600) / <alpha-value>)',
          700: 'rgb(var(--cyra-700) / <alpha-value>)',
          800: 'rgb(var(--cyra-800) / <alpha-value>)',
          900: 'rgb(var(--cyra-900) / <alpha-value>)',
          950: 'rgb(var(--cyra-950) / <alpha-value>)',
        },
        ink: {
          50: 'rgb(var(--ink-50) / <alpha-value>)',
          100: 'rgb(var(--ink-100) / <alpha-value>)',
          200: 'rgb(var(--ink-200) / <alpha-value>)',
          300: 'rgb(var(--ink-300) / <alpha-value>)',
          400: 'rgb(var(--ink-400) / <alpha-value>)',
          500: 'rgb(var(--ink-500) / <alpha-value>)',
          600: 'rgb(var(--ink-600) / <alpha-value>)',
          700: 'rgb(var(--ink-700) / <alpha-value>)',
          800: 'rgb(var(--ink-800) / <alpha-value>)',
          900: 'rgb(var(--ink-900) / <alpha-value>)',
          950: 'rgb(var(--ink-950) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['"Nunito Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(249,115,22,0.25), 0 10px 30px rgba(249,115,22,0.15)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        shimmer: 'shimmer 8s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
}

