module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      body: ['Recoleta'],
      text: ['Poppins', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
