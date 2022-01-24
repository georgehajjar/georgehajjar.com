const { colors } = require('./src/components/colors');

module.exports = {
  content: ['./src/**/*.{ts,tsx}', './public/index.html'],
  theme: {
    colors,
  },
  plugins: [],
};
