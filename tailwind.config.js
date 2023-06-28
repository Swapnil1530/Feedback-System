/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    extend: {
      gap: {
        '4': '5rem',
      },
      colors: {
        green: {
          '600': '#16a34a',
        },
      },
    }
    
  },
 
}