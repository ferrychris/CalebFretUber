/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sunset: {
          DEFAULT: '#FF7940',
          50: '#FFF8F5',
          100: '#FFE8DE',
          200: '#FFD1BC',
          300: '#FFB088',
          400: '#FF9764',
          500: '#FF7940',
          600: '#E65D24',
          700: '#CC4A1A',
          800: '#B33810',
          900: '#992606'
        },
        midnight: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          DEFAULT: '#0A0A0A'
        },
        green: {
          DEFAULT: '#22C55E',
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D'
        },
        purple: {
          DEFAULT: '#805AD5',
          50: '#F7F5FE',
          100: '#EDE9FC',
          200: '#DED5F9',
          300: '#BEA8F2',
          400: '#9F7AEA',
          500: '#805AD5',
          600: '#6B46C1',
          700: '#553C9A',
          800: '#44337A',
          900: '#322659'
        }
      },
      backgroundImage: {
        'gradient-light': 'linear-gradient(135deg, #FFFFFF 0%, #F3F4F6 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #FF7940 0%, #FFB088 100%)',
        'gradient-sunset-dark': 'linear-gradient(135deg, #E65D24 0%, #FF7940 100%)',
        'gradient-purple': 'linear-gradient(135deg, #805AD5 0%, #9F7AEA 100%)',
        'gradient-purple-dark': 'linear-gradient(135deg, #6B46C1 0%, #805AD5 100%)',
        'gradient-green': 'linear-gradient(135deg, #22C55E 0%, #4ADE80 100%)',
        'gradient-green-dark': 'linear-gradient(135deg, #16A34A 0%, #22C55E 100%)'
      },
      boxShadow: {
        'soft-light': '0 4px 8px rgba(0, 0, 0, 0.05)',
        'soft-dark': '0 4px 8px rgba(0, 0, 0, 0.2)',
        'medium-light': '0 8px 16px rgba(0, 0, 0, 0.1)',
        'medium-dark': '0 8px 16px rgba(0, 0, 0, 0.3)',
        'glow-sunset': '0 0 10px rgba(255, 121, 64, 0.2)',
        'glow-sunset-dark': '0 0 10px rgba(255, 121, 64, 0.4)',
        'glow-purple': '0 0 10px rgba(128, 90, 213, 0.2)',
        'glow-purple-dark': '0 0 10px rgba(128, 90, 213, 0.4)',
        'glow-green': '0 0 10px rgba(34, 197, 94, 0.2)',
        'glow-green-dark': '0 0 10px rgba(34, 197, 94, 0.4)'
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '24px'
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-up': 'slideUp 0.2s ease-out',
        'slide-down': 'slideDown 0.2s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    }
  },
  plugins: []
};