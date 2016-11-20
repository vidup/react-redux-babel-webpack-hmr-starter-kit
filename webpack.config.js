require('dotenv').config();

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const cssnext = require('postcss-cssnext');
const precss = require('precss');

const localIdentName = process.env.NODE_ENV !== 'development'
  ? '[hash:base64:5]'
  : '[path]___[name]__[local]___[hash:base64:5]';

const defines = {
  'process.env': JSON.stringify({
    NODE_ENV: process.env.NODE_ENV,
    APP_ENV: process.env.APP_ENV,
  }),
};

const config = {
  devtool: 'cheap-eval-source-map',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    './index.js'
  ],
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // new webpack.DefinePlugin(defines),
    // new webpack.WatchIgnorePlugin([
    //   path.resolve(__dirname, './node_modules/'),
    // ]),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: [ 'stage-2', 'react', 'react-hmre' ]
        },
        exclude: /node_modules/,
        include: __dirname,
      },
      {
        test: /\.scss$/,
        loader: `style!css-loader?modules&importLoaders=1&localIdentName=${localIdentName}!postcss-loader!sass-loader`,
        exclude: /node_modules/,
        include: __dirname,
      },
      {
        test: /\.css$/,
        loader: `style!css-loader?modules&importLoaders=1&localIdentName=${localIdentName}!postcss-loader`,
        exclude: /node_modules|styles\/fonts\/fonts.css$/,
        include: __dirname,
      },
      {
        test: path.resolve(__dirname, 'styles/fonts/fonts.css'),
        loader: 'style!css',
        exclude: /node_modules/,
      },
      {
        test: /\.(otf|eot|svg|ttf|woff(2)?|jpg|png|jpeg|gif)/,
        loader: 'file-loader',
      },
    ],
  },
  postcss: () => [precss, cssnext],
};

module.exports = config;
