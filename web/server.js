
const { createServer } = require('https');
const { readFileSync } = require('fs');
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: readFileSync('./localhost-key.pem'),
  cert: readFileSync('./localhost.pem'),
};

app.prepare().then(() => {
  const server = express();

  server.all('*', (req, res) => handle(req, res));

  createServer(httpsOptions, server).listen(3000, () => {
    console.log('✅ HTTPS server running at https://localhost:3000');
  });
});
