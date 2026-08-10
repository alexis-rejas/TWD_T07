/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./static/index.html",
    "./static/templates/**/*.html",
    "./static/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#1e40af',
      },
    },
  },
  plugins: [],
}
