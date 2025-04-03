// server.js
const { createServer } = require("http");
const next = require("next");

// Set dev: false and configure the distDir to your build folder (e.g., "build")
const app = next({ dev: false, conf: { distDir: "build" } });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:" + (3000));
  });
});
