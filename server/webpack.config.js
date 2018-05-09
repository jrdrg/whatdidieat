const serverless = require('serverless-webpack');
const path = require('path');

const outputDir = path.join(__dirname, "build/");
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    entry: serverless.lib.entries,
    mode: isProd ? 'production' : 'development',
    output: {
        path: outputDir,
        filename: '[name].js',
        libraryTarget: 'commonjs'
    }
};
