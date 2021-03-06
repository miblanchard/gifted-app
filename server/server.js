const express = require('express');
const app = express();
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.config');

const PORT = 8080;
const DEVPORT = 9090;


app.use(express.static(path.join(__dirname, './../')));


app.get('/app.js', (req, res) => {
  if (process.env.PRODUCTION) {
    res.sendFile(__dirname + '/client/app.js');
  } else {
    res.redirect('//localhost:9090/client/app.js');
  }
});

// Serve aggregate stylesheet depending on environment
app.get('/style.css', (req, res) => {
  if (process.env.PRODUCTION) {
    res.sendFile(__dirname + '/client/style.css');
  } else {
    res.redirect('//localhost:9090/client/style.css');
  }
});

// Serve index page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'index.html'));
  // res.sendFile(__dirname + '/index.html');
});


app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  noInfo: true,
  historyApiFallback: true
}).listen(DEVPORT, 'localhost', (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(`Webpack Dev Server started at ${DEVPORT}`);
});