/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Skyward theme - Sky blue with sunset orange accents
        skyward: {
          primary: '#0ea5e9',    // Sky blue
          secondary: '#0284c7',  // Deeper sky blue
          accent: '#f97316',     // Sunset orange
          light: '#7dd3fc',      // Light sky
          pale: '#e0f2fe',       // Pale sky/clouds
          dark: '#0c1929',       // Night sky
          darker: '#060d17',     // Deep night
          cloud: '#f0f9ff',      // Cloud white
          sunset: '#fb923c',     // Sunset glow
          golden: '#fbbf24',     // Golden hour
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'drift': 'drift 8s ease-in-out infinite',
        'cloud-drift': 'cloudDrift 20s linear infinite',
        'cloud-drift-slow': 'cloudDrift 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        drift: {
          '0%, 100%': { transform: 'translateX(0) translateY(0)' },
          '25%': { transform: 'translateX(5px) translateY(-5px)' },
          '50%': { transform: 'translateX(0) translateY(-10px)' },
          '75%': { transform: 'translateX(-5px) translateY(-5px)' },
        },
        cloudDrift: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100vw)' },
        }
      },
      backgroundImage: {
        'sky-gradient': 'linear-gradient(to bottom, #0ea5e9, #7dd3fc, #fbbf24)',
        'night-sky': 'linear-gradient(to bottom, #0c1929, #1e3a5f, #0c1929)',
        'sunset-gradient': 'linear-gradient(to right, #f97316, #fbbf24, #0ea5e9)',
      }
    },
  },
  plugins: [],
}
