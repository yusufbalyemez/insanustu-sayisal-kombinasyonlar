/** @type {import('tailwindcss').Config} */
module.exports = {
  // iOS/Android dokunmatik ekranlarda hover: stilleri "yapışıp" kalmasın;
  // hover sadece fare olan cihazlarda çalışsın.
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}