/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'bg-cyber-dark',
    'bg-cyber-gray',
    'text-neon-blue',
    'text-neon-green',
    'text-neon-red',
    'border-neon-blue',
    'border-neon-green',
    'border-neon-red',
    'neon-text',
    'neon-green-text',
    'neon-red-text',
    'cyber-button',
    'glitch-effect'
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00f5ff',
        'neon-green': '#00ff41',
        'neon-red': '#ff0040',
        'cyber-dark': '#0a0a0a',
        'cyber-gray': '#1a1a1a',
      },
      fontFamily: {
        'mono': ['Monaco', 'Consolas', 'monospace'],
      },
      animation: {
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite alternate',
        'glitch': 'glitch 0.3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-neon': {
          '0%': { textShadow: '0 0 5px #00f5ff, 0 0 10px #00f5ff, 0 0 20px #00f5ff' },
          '100%': { textShadow: '0 0 10px #00f5ff, 0 0 20px #00f5ff, 0 0 40px #00f5ff' },
        },
        'glitch': {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
      },
    },
  },
  plugins: [],
}