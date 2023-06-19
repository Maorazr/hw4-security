const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const supertest = require("supertest");

let server;

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const startServer = () =>
  new Promise((resolve) => {
    server = createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    });

    server.listen(3000, () => {
      console.log("Server started");
      global.testRequest = supertest(server);
      console.log("global.testRequest", !!global.testRequest);
      resolve();
    });

    server.on("error", (error) => {
      console.error(`Server Error: ${error}`);
    });
  });

const stopServer = () =>
  new Promise((resolve, reject) => {
    if (server) {
      server.close((err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    } else {
      resolve();
    }
  });

module.exports = {
  app,
  startServer,
  stopServer,
};
