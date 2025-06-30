/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#4A90E2', // trustworthy sky blue
        'primary-50': '#EBF4FD', // very light blue
        'primary-100': '#D6E9FB', // light blue
        'primary-200': '#AED3F7', // lighter blue
        'primary-300': '#85BDF3', // medium light blue
        'primary-400': '#5CA7EF', // medium blue
        'primary-500': '#4A90E2', // primary blue
        'primary-600': '#3B73B5', // darker blue
        'primary-700': '#2C5688', // dark blue
        'primary-800': '#1D395B', // very dark blue
        'primary-900': '#0E1C2E', // deepest blue
        'primary-foreground': '#FFFFFF', // white

        // Secondary Colors
        'secondary': '#7B68EE', // complementary purple
        'secondary-50': '#F0EEFF', // very light purple
        'secondary-100': '#E1DDFF', // light purple
        'secondary-200': '#C3BBFF', // lighter purple
        'secondary-300': '#A599FF', // medium light purple
        'secondary-400': '#8777FF', // medium purple
        'secondary-500': '#7B68EE', // secondary purple
        'secondary-600': '#6253BE', // darker purple
        'secondary-700': '#493E8F', // dark purple
        'secondary-800': '#31295F', // very dark purple
        'secondary-900': '#181430', // deepest purple
        'secondary-foreground': '#FFFFFF', // white

        // Accent Colors
        'accent': '#2ECC71', // success-oriented green
        'accent-50': '#E8F8F0', // very light green
        'accent-100': '#D1F2E1', // light green
        'accent-200': '#A3E5C3', // lighter green
        'accent-300': '#75D8A5', // medium light green
        'accent-400': '#47CB87', // medium green
        'accent-500': '#2ECC71', // accent green
        'accent-600': '#25A35A', // darker green
        'accent-700': '#1C7A44', // dark green
        'accent-800': '#13512D', // very dark green
        'accent-900': '#0A2817', // deepest green
        'accent-foreground': '#FFFFFF', // white

        // Background Colors
        'background': '#FAFBFC', // soft off-white
        'surface': '#FFFFFF', // pure white
        'surface-50': '#F8F9FA', // very light gray
        'surface-100': '#F1F3F4', // light gray
        'surface-200': '#E3E7EA', // lighter gray
        'surface-300': '#D5DBE0', // medium light gray
        'surface-400': '#C7CFD6', // medium gray
        'surface-500': '#B9C3CC', // darker gray

        // Text Colors
        'text-primary': '#2C3E50', // deep blue-gray
        'text-secondary': '#7F8C8D', // medium gray
        'text-muted': '#95A5A6', // light gray
        'text-inverse': '#FFFFFF', // white

        // Status Colors
        'success': '#27AE60', // darker green variant
        'success-50': '#E7F6ED', // very light success green
        'success-100': '#CFEDDB', // light success green
        'success-200': '#9FDBB7', // lighter success green
        'success-300': '#6FC993', // medium light success green
        'success-400': '#3FB76F', // medium success green
        'success-500': '#27AE60', // success green
        'success-600': '#1F8B4D', // darker success green
        'success-700': '#17683A', // dark success green
        'success-800': '#0F4527', // very dark success green
        'success-900': '#072213', // deepest success green
        'success-foreground': '#FFFFFF', // white

        'warning': '#F39C12', // warm orange
        'warning-50': '#FEF5E7', // very light warning orange
        'warning-100': '#FDEBCF', // light warning orange
        'warning-200': '#FBD79F', // lighter warning orange
        'warning-300': '#F9C36F', // medium light warning orange
        'warning-400': '#F7AF3F', // medium warning orange
        'warning-500': '#F39C12', // warning orange
        'warning-600': '#C27D0E', // darker warning orange
        'warning-700': '#925E0B', // dark warning orange
        'warning-800': '#613F07', // very dark warning orange
        'warning-900': '#311F04', // deepest warning orange
        'warning-foreground': '#FFFFFF', // white

        'error': '#E74C3C', // clear red
        'error-50': '#FDEBEA', // very light error red
        'error-100': '#FBD7D4', // light error red
        'error-200': '#F7AFA9', // lighter error red
        'error-300': '#F3877E', // medium light error red
        'error-400': '#EF5F53', // medium error red
        'error-500': '#E74C3C', // error red
        'error-600': '#B93D30', // darker error red
        'error-700': '#8B2E24', // dark error red
        'error-800': '#5C1F18', // very dark error red
        'error-900': '#2E0F0C', // deepest error red
        'error-foreground': '#FFFFFF', // white

        // Border Colors
        'border': '#E1E8ED', // light gray border
        'border-light': '#F0F3F6', // very light border
        'border-medium': '#D1D9E0', // medium border
        'border-dark': '#B2BCC7', // dark border
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Source Sans Pro', 'sans-serif'],
        'caption': ['Roboto', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      boxShadow: {
        'soft': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        'medium': '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
        'heavy': '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'slide-down': 'slideDown 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      transitionTimingFunction: {
        'ease-out-custom': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      transitionDuration: {
        '250': '250ms',
        '300': '300ms',
      },
      backdropBlur: {
        xs: '2px',
      },
      minHeight: {
        'touch': '44px',
      },
      minWidth: {
        'touch': '44px',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}