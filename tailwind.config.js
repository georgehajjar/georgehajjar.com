const { colors } = require('./src/components/colors');

module.exports = {
  content: [],
  theme: {
    colors,
  },
  plugins: [],
  purge: ['./src/**/*.{ts,tsx}', './public/index.html'],
};
