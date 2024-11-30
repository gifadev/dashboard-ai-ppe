/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#121212',
        'sidebar': '#1a1a1a',
        'sidebar-hover': '#252525',
        'video-bg': '#2a2a2a',
      },
    },
  },
  plugins: [],
}
