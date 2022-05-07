module.exports = {
  darkMode: 'class',
  content: [
    `components/**/*.{vue,js,ts}`,
    `modules/**/*.{vue,js,ts}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `composables/**/*.{js,ts}`,
    `plugins/**/*.{js,ts}`,
    `App.{js,ts,vue}`,
    `app.{js,ts,vue}`,
  ],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}
