// const { PrismaClient } = require("@prisma/client");
// const request = require("supertest");
// const prisma = new PrismaClient();
// const app = require("../pages/_app").default;

// jest.mock("../pages/_app", () => ({
//   __esModule: true,
//   default: () => {
//     return function MockedFunction() {};
//   },
// }));

// describe("User Endpoints", () => {
//   afterEach(async () => {
//     // Close the Prisma connection after each test
//     await prisma.$disconnect();
//   });
//   it("should create a new user", async () => {
//     const res = await request(app).post("/api/auth/register").send({
//       name: "Test User",
//       email: "test@example.com",
//       password: "password",
//     });
//     expect(res.statusCode).toEqual(201);
//     xz;
//     expect(res.body).toHaveProperty("id");
//   });

//   it("should authenticate a user", async () => {
//     const res = await request(app).post("/api/auth/login").send({
//       email: "test@example.com",
//       password: "password",
//     });
//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toHaveProperty("token");
//   });

//   it("should fetch a user profile", async () => {
//     const authRes = await request(app).post("/api/auth/login").send({
//       email: "test@example.com",
//       password: "password",
//     });

//     const res = await request(app)
//       .get("/api/auth/user")
//       .set("Authorization", `Bearer ${authRes.body.token}`);

//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toHaveProperty("name");
//   });
// });
