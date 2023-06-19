const { app, startServer } = require("./server");

const globalSetup = async () => {
  console.log("Global setup starting");
  await app.prepare();
  await startServer();
  console.log("Global setup completed");
};

module.exports = globalSetup;
