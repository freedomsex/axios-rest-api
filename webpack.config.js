const path = require('path');

module.exports = {
  output: {
    libraryTarget: 'commonjs2', 
  },
  externals: {
    axios: 'axios', 
    underscore: 'underscore', 
  },
  module: {
    rules: [ 
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
};
