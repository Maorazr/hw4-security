const { stopServer } = require("./server");
import prisma from "./lib/prisma";

const globalTeardown = async () => {
  console.log("Global teardown starting");
  await stopServer();
  console.log("Server stopped");

  await prisma.$disconnect();
  console.log("Prisma client disconnected");

  console.log("Global teardown completed");
};

module.exports = globalTeardown;
