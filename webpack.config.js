/* eslint-disable */
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
/* eslint-enable */

module.exports = {
  devtool: 'source-map',
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        // @TODO we could make using config better but this works for now..
        INFURA_PROJECT_ID: JSON.stringify('dd71a1758118408cb01a33faffc7a402'),
        INFURA_NETWORK: JSON.stringify('homestead'),
        WEIWATCHERS_URL: JSON.stringify('https://weiwatchers.com/feeds-mainnet.json'),
      },
    }),
    new HtmlWebPackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
    }),
  ],
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true,
  },
};
