import prisma from "../../lib/prisma";
const randomId1 = Math.random().toString(36).substring(2, 15);
const randomId2 = Math.random().toString(36).substring(2, 15);

const validRegistrationDetails1 = {
  name: `TestUser_${randomId1}`,
  username: `testuser_${randomId1}`,
  password: "testPassword",
  email: `testuser_${randomId1}@test.com`,
};

const validRegistrationDetails2 = {
  name: `TestUser_${randomId2}`,
  username: `testuser_${randomId2}`,
  password: "testPassword",
  email: `testuser_${randomId2}@test.com`,
};

describe("User Registration API", () => {
  test("User should be able to register with valid details", async () => {
    console.log("global.testRequest in test", !!global.testRequest);
    const response = await global.testRequest
      .post("/api/auth/register")
      .send(validRegistrationDetails1);

    expect(response.status).toBe(201);
  });

  test("User should not be able to register with an existing username", async () => {
    let response = await global.testRequest
      .post("/api/auth/register")
      .send(validRegistrationDetails2);

    expect(response.status).toBe(201);

    response = await global.testRequest
      .post("/api/auth/register")
      .send(validRegistrationDetails2);

    expect(response.status).toBe(409);
  });

  test("User should not be able to register with incomplete details", async () => {
    const incompleteRegistrationDetails = {
      ...validRegistrationDetails1,
      // Omitting the password
      password: undefined,
    };
    const response = await global.testRequest
      .post("/api/auth/register")
      .send(incompleteRegistrationDetails);

    // The request should fail
    expect(response.status).toBe(400);
  });
});
