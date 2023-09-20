import dotenv from "dotenv";
dotenv.config();
import { connectDB, disconnectDB, clearAllData } from "../src/db";
import request from "supertest";
import { faker } from "@faker-js/faker";
import app from "../src/app";

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await disconnectDB();
});

const username = `${faker.person.firstName()}2023`;
const email = faker.internet.email();
const password = "SafinAhmed2023!";
let accessToken;
let refreshToken;

describe("POST /auth/register", () => {
  it("should create a user if valid data is provided", async () => {
    const res = await request(app).post("/api/v1/public/auth/register").send({
      username: username,
      email: email,
      password: password,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.username).toBe(username);
    expect(res.body.data.email).toBe(email);
  });

  it("should response with 400 error message if provided data is invalid", async () => {
    const res = await request(app).post("/api/v1/public/auth/register").send({
      username: username,
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Bad Request");
  });
});

describe("POST /auth/login", () => {
  it("should return a 200 response with access token and refresh token", async () => {
    const res = await request(app).post("/api/v1/public/auth/login").send({
      email,
      password,
    });

    // Response status should be 200
    expect(res.statusCode).toBe(200);

    // Response message should be login successful
    expect(res.body.message).toBe("Login Successful");

    // Response data should contain access_token and refresh_token
    expect(res.body.data).toHaveProperty("access_token");
    expect(res.body.data).toHaveProperty("refresh_token");

    // It should have hateoas links
    expect(res.body.links).toBeDefined();

    accessToken = res.body.data.access_token;

    refreshToken = res.body.data.refresh_token;
  });

  it("should return a 400 response if email or password doesnt match", async () => {
    const res = await request(app).post("/api/v1/public/auth/login").send({
      email,
      password: "invalid123",
    });

    // Response should return 400 status code
    expect(res.statusCode).toBe(400);

    // Response should contain a error field
    expect(res.body.error).toBeDefined();
  });

  it("should return a 400 response if any required field are not provided", async () => {
    const res = await request(app).post("/api/v1/public/auth/login").send({
      email,
    });

    // Response should return 400 status code
    expect(res.statusCode).toBe(400);

    // Response should contain a error field of bad request
    expect(res.body.error).toBe("Bad Request");
  });
});

describe("POST /auth/token/refresh", () => {
  it("should return a 200 response with access token and refresh token", async () => {
    const res = await request(app)
      .post("/api/v1/public/auth/token/refresh")
      .send({
        token: refreshToken,
      });

    // Response status should be 200
    expect(res.statusCode).toBe(200);

    // Response message should be login successful
    expect(res.body.message).toBe("Successfully Refreshed Your Tokens");

    // Response data should contain access_token and refresh_token
    expect(res.body.data).toHaveProperty("access_token");
    expect(res.body.data).toHaveProperty("refresh_token");

    // It should have hateoas links
    expect(res.body.links).toBeDefined();

    accessToken = res.body.data.access_token;

    refreshToken = res.body.data.refresh_token;
  });

  it("should return a 400 response if refresh token is invalid", async () => {
    const res = await request(app)
      .post("/api/v1/public/auth/token/refresh")
      .send({
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDE5OTQyOTY1ZjI1NGVjZDIzYzFhMiIsInVzZXJfaWQiOiI2NGZlMTYxOWU2OGRmYzY2MzM1YmUwOGQiLCJ1c2VybmFtZSI6InNhZmluYWhtZWQiLCJlbWFpbCI6InNhZmluQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiaWF0IjoxNjk0NjAzNTg2fQ.o3zbMudaSTCNrxQmUEccb9ErqIW55SY1nQT5CVIlCGo",
      });

    // Response should return 400 status code
    expect(res.statusCode).toBe(400);

    // Response should contain a error field
    expect(res.body.error).toBe("Invalid Token");
  });

  it("should return a 400 response if any required field are not provided", async () => {
    const res = await request(app).post("/api/v1/public/auth/token/refresh");

    // Response should return 400 status code
    expect(res.statusCode).toBe(400);

    // Response should contain a error field of bad request
    expect(res.body.error).toBe("Bad Request");
  });
});

describe("POST /auth/token/revoke", () => {
  it("should return a 200 response with the revoked refresh token", async () => {
    const res = await request(app)
      .post("/api/v1/private/auth/token/revoke")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        token: refreshToken,
      });

    // Response status should be 200
    expect(res.statusCode).toBe(200);

    // Response message should be login successful
    expect(res.body.message).toBe("Successfully Revoked Your Token");

    // Response data should contain revoked refresh_token
    expect(res.body.data).toHaveProperty("refresh_token");

    // It should have hateoas links
    expect(res.body.links).toBeDefined();
  });

  it("should return a 400 response if refresh token is invalid", async () => {
    const res = await request(app)
      .post("/api/v1/private/auth/token/revoke")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDE5OTQyOTY1ZjI1NGVjZDIzYzFhMiIsInVzZXJfaWQiOiI2NGZlMTYxOWU2OGRmYzY2MzM1YmUwOGQiLCJ1c2VybmFtZSI6InNhZmluYWhtZWQiLCJlbWFpbCI6InNhZmluQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiaWF0IjoxNjk0NjAzNTg2fQ.o3zbMudaSTCNrxQmUEccb9ErqIW55SY1nQT5CVIlCGo",
      });

    // Response should return 400 status code
    expect(res.statusCode).toBe(400);

    // Response should contain a error field
    expect(res.body.error).toBe("Invalid token!");
  });

  it("should return a 400 response if any required field are not provided", async () => {
    const res = await request(app)
      .post("/api/v1/private/auth/token/revoke")
      .set("Authorization", `Bearer ${accessToken}`);

    // Response should return 400 status code
    expect(res.statusCode).toBe(400);

    // Response should contain a error field of bad request
    expect(res.body.error).toBe("Bad Request");
  });

  it("should return 401 response if bearer token is not provided", async () => {
    const res = await request(app)
      .post("/api/v1/private/auth/token/revoke")
      .send({
        token: refreshToken,
      });

    // Response should be 401 status code
    expect(res.statusCode).toBe(401);

    // Response should contain a message unauthorized
    expect(res.body.error).toBe("Unauthorized");
  });
});

describe("POST /auth/token/validate", () => {
  it("should return a 400 response when an invalid refresh token is provided", async () => {
    const res = await request(app)
      .post("/api/v1/public/auth/token/validate")
      .send({
        token: refreshToken,
      });

    // Response status should be 200
    expect(res.statusCode).toBe(400);

    // Response message should be login successful
    expect(res.body.message).toBe("The token is invalid");

    // Response data should contain provided refresh_token
    expect(res.body.data).toHaveProperty("refresh_token");

    // Response data should also contain the validity status

    expect(res.body.data.validity).toBe(false);

    // It should have hateoas links
    expect(res.body.links).toBeDefined();
  });

  it("should return a 200 response if provided refresh token is valid", async () => {
    const loginResponse = await request(app)
      .post("/api/v1/public/auth/login")
      .send({
        email,
        password,
      });

    accessToken = loginResponse.body.data.access_token;
    refreshToken = loginResponse.body.data.refresh_token;
    const res = await request(app)
      .post("/api/v1/public/auth/token/validate")
      .send({
        token: refreshToken,
      });

    // Response should return 400 status code
    expect(res.statusCode).toBe(200);

    // Response should contain a message
    expect(res.body.message).toBe("The token is valid");

    // Response should contain hateoas links
    expect(res.body.links).toBeDefined();
  });
});
