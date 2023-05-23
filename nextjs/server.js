const http = require("http");
const { parse } = require("url");
const next = require("next");

const hostname = process.env.NEXTAUTH_URL;
const port = 443;

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const HTTP_PORT = 80;

app.prepare().then(() => {
  http
    .createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    })
    .listen(HTTP_PORT, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${HTTP_PORT}`);
    });
});

const https = require("https");
const fs = require("fs");
const options = {
  key: fs.readFileSync(`./config/${process.env.SSL_KEY}`),
  cert: fs.readFileSync(`./config/${process.env.SSL}`),
};

const HTTPS_PORT = 443;
app.prepare().then(() => {
  https
    .createServer(options, (req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    })
    .listen(HTTPS_PORT, (err) => {
      if (err) throw err;
      console.log(`> Ready on https://localhost:${HTTPS_PORT}`);
    });
});
