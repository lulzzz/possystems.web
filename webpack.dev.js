const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
var path = require('path');
var webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, '/public'),
    headers: { 'Access-Control-Allow-Origin': '*' },
    writeToDisk: true,
    hotOnly: true,
    port: 3000,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
