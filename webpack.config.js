const path = require('path');
const outputPath = path.resolve(__dirname, './docs');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: outputPath,
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: outputPath
  },
};