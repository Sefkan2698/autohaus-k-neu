/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Citroën Brand Colors aus deinen Style-Docs
        'citroen-red': '#DC2626',
        'citroen-red-hover': '#B91C1C',
        'citroen-red-light': '#FEF2F2',
        'citroen-blue': '#1E40AF',
        'citroen-gray': '#6B7280',
        
        // Design System
        primary: {
          DEFAULT: '#DC2626',
          50: '#FEF2F2',
          100: '#FEE2E2',
          500: '#DC2626',
          600: '#B91C1C',
          700: '#991B1B',
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      fontFamily: {
        'sans': ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        'mono': ['var(--font-geist-mono)', 'monospace'],
        'display': ['Poppins', 'sans-serif'], // Für Headlines
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'car-drive': 'carDrive 4s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        carDrive: {
          '0%': { transform: 'translateX(-100px) scale(0.8)' },
          '50%': { transform: 'translateX(0px) scale(1)' },
          '100%': { transform: 'translateX(100px) scale(0.8)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'car-pattern': "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23DC2626\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"20\" cy=\"20\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
      }
    },
  },
  plugins: [],
};