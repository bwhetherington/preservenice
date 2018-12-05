const path = require('path');
const express = require('express');
const compression = require('compression');

const app = express();
app.use(compression());

const DIR = 'static';

function valueOrElse(value, other) {
  return value === null || value === undefined ? other : value;
}

const port = valueOrElse(process.env.PORT, 8080);

// Serve static files
app.get(`/${DIR}/*`, (req, res) => {
  const file = path.join(__dirname, req.path).replace(/%20/g, ' ');
  res.sendFile(file);
});

app.get('*/main.js', (_, res) => {
  const main = path.resolve(__dirname, 'dist', 'main.js');
  res.sendFile(main);
});

// Redirect all routes to static/index.html and then allow react-router to handle it
app.get('**', (_, res) => {
  const index = path.resolve(__dirname, 'dist', 'index.html');
  res.sendFile(index);
});

// Allow access to build directory
// app.use(express.static(DIR));

// Listen to the specified port
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
