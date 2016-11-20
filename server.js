require('dotenv').config();

const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");

const config = require('./webpack.config.js');
const compiler = webpack(config);

const app = express();

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  hot: true,
  filename: 'bundle.js',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
  watchOptions: {
    poll: true,
  }
}));

app.use('/', webpackHotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
}));

app.get('*', function(req, res) {
  res.sendFile(`${__dirname}/index.html`);
});

app.listen(process.env.PUBLIC_APP_PORT, function(err) {
  if (err) console.log(err);
  console.log('Listening on port', process.env.PUBLIC_APP_PORT);
});
