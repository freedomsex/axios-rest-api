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
        use: ["babel-loader", "eslint-loader"],
      },
    ],
  },

//   output: {
//     library: 'Censoring',
//     globalObject: 'this',
//     filename: "Censoring.js",
//     libraryTarget: "umd"
//   },
};
