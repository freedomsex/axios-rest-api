const path = require('path');

module.exports = {
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
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: 'babel-loader',
      //   options: {
      //     presets: ['@babel/env'],
      //   },
      // },
    ],
  },

//   output: {
//     library: 'Censoring',
//     globalObject: 'this',
//     filename: "Censoring.js",
//     libraryTarget: "umd"
//   },
};
