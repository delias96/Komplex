module.exports = {
  content: [
    './src/**/*.{html,ts}'
  ],
  media: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      backgroundColor: ['disabled']
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio")
  ],
}
