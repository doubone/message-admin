const path = require('path');

module.exports = {
  entry: './scripts/login.js',
  output: {
    filename: 'login.js',
    path: path.resolve(__dirname, './public/js'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 3000,
    hot:true
  },
};