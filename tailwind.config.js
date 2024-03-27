const { colors } = require('./src/colors');

module.exports = {
  content: ['./src/**/*.{ts,tsx}', './public/index.html'],
  theme: {
    colors,
  },
  plugins: [],
};
