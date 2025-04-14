const { createServer } = require("https");
const { parse } = require("url");
const fs = require("fs");
const next = require("next");
const path = require("path");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const certPath = path.resolve(__dirname, "certificates/localhost.pem");
const keyPath = path.resolve(__dirname, "certificates/localhost-key.pem");

const httpsOptions = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath),
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log("> HTTPS Server running at https://localhost:3000");
  });
});
//
//
