/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        charcoal: {
          950: '#0a0a0a',
          900: '#121212',
          850: '#171717',
          800: '#1e1e1e',
          700: '#2a2a2a',
          600: '#383838',
        },
        emerald: {
          neon: '#10b981',
          glow: '#059669',
          light: '#34d399',
          bright: '#00f59b',
          dim: 'rgba(16, 185, 129, 0.12)',
        },
        slate: {
          secondary: '#9ca3af',
          muted: '#6b7280',
          light: '#e5e7eb',
        },
        amber: {
          urgent: '#f59e0b',
          glow: 'rgba(245, 158, 11, 0.15)',
        }
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.03em',
        snug: '-0.015em',
      },
      boxShadow: {
        'neon-emerald': '0 0 25px -3px rgba(16, 185, 129, 0.45), 0 0 10px -2px rgba(16, 185, 129, 0.3)',
        'neon-emerald-lg': '0 0 50px -5px rgba(16, 185, 129, 0.6), 0 0 20px -3px rgba(16, 185, 129, 0.4)',
        'neon-glow': '0 0 35px rgba(0, 245, 155, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-hover': '0 8px 32px 0 rgba(16, 185, 129, 0.15)',
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at 50% 30%, rgba(16, 185, 129, 0.15) 0%, rgba(10, 10, 10, 0) 70%)',
        'subtle-grid': 'linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
