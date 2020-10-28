const path = require('path')

module.exports = {

  sassOptions: {
    includePaths: [path.join(__dirname, './assets/styles')],
  },
  
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      exclude: /node_modules/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ['@svgr/webpack'],
    });

    return config;
  },

};