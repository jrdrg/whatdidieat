require('dotenv').config();

const path = require('path');
const outputDir = path.join(__dirname, 'build/');
const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/Index.bs.js',
  mode: isProd ? 'production' : 'development',
  output: {
    path: outputDir,
    publicPath: outputDir,
    filename: 'Index.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'IDENTITY_POOL_ID': JSON.stringify(process.env.IDENTITY_POOL_ID),
        'REGION': JSON.stringify(process.env.REGION),
        'USER_POOL_ID': JSON.stringify(process.env.USER_POOL_ID),
        'USER_POOL_WEB_CLIENT_ID': JSON.stringify(process.env.USER_POOL_WEB_CLIENT_ID)
      }
    })
  ]
};
