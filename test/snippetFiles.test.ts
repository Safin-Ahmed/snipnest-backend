import dotenv from "dotenv";
dotenv.config();
import app from "../src/app";
import { connectDB, disconnectDB } from "../src/db";
import request from "supertest";

let authToken;
let createdSnippetFile;

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await disconnectDB();
});

describe("GET /api/v1/public/snippets/files", () => {
  it("should return a list of snippet files with HTTP 200", async () => {
    const response = await request(app).get("/api/v1/public/snippets/files");

    expect(response.status).toBe(200);
  });

  it("should handle valid query parameters with HTTP 200", async () => {
    const response = await request(app).get(
      "/api/v1/public/snippets/files?page=2&limit=20&sort=title:asc"
    );

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      data: expect.any(Array),
      pagination: expect.any(Object),
      links: expect.any(Object),
    });
  });

  it("should handle invalid query parameters with HTTP 400", async () => {
    const response = await request(app).get(
      "/api/v1/public/snippets/files?pages=0&limits=1000&sorts=invalid&search=keyword"
    );

    expect(response.status).toBe(400);
  });

  // Add more test cases as needed
});

describe("POST /api/v1/private/snippets/files", () => {
  beforeAll(async () => {
    await request(app).post("/api/v1/public/auth/register").send({
      username: "ehsafin",
      email: "ehsafin@gmail.com",
      password: "SafinAhmed2021!",
    });

    const loginResponse = await request(app)
      .post("/api/v1/public/auth/login")
      .send({
        email: "ehsafin@gmail.com",
        password: "SafinAhmed2021!",
      });

    authToken = loginResponse.body.data.access_token;
  });

  it("should create a new snippet file with HTTP 201", async () => {
    // Replace with a valid request body for creating a snippet file
    const requestBody = {
      filename: "example.js",
      content: 'console.log("Hello, World!");',
      language: "javascript",
    };

    const response = await request(app)
      .post("/api/v1/private/snippets/files")
      .set("Content-Type", "application/json")
      .send(requestBody)
      .set("Authorization", `Bearer ${authToken}`); // Replace with a valid access token

    expect(response.status).toBe(201);
    expect(response.body.code).toBe(201);
    expect(response.body.message).toBe("Snippet File created successfully");
    expect(response.body.data).toBeDefined();
    expect(response.body.links).toBeDefined();

    // Assign created snippet file id to the variable
    createdSnippetFile = response.body.data.id;
  });

  it("should handle invalid request with HTTP 400", async () => {
    // Replace with an invalid request body
    const invalidRequestBody = {
      invalid: "invalid code",
    };

    const response = await request(app)
      .post("/api/v1/private/snippets/files")
      .send(invalidRequestBody)
      .set("Authorization", `Bearer ${authToken}`); // Replace with a valid access token

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Bad Request");
  });

  it("should handle unauthorized request with HTTP 401", async () => {
    const requestBody = {
      filename: "example.js",
      content: 'console.log("Hello, World!");',
      language: "javascript",
    };

    const response = await request(app)
      .post("/api/v1/private/snippets/files")
      .send(requestBody);

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Unauthorized");
  });

  // Add more test cases as needed
});

describe("GET /api/v1/public/snippets/files/{id}", () => {
  it("should return a single snippet file with HTTP 200", async () => {
    const response = await request(app).get(
      `/api/v1/public/snippets/files/${createdSnippetFile}`
    );

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.id).toBe(createdSnippetFile);
    expect(response.body.links).toBeDefined();
  });

  it("should handle non-existing snippet file with HTTP 404", async () => {
    const nonExistingSnippetFileId = "nonexistent123";

    const response = await request(app).get(
      `/api/v1/public/snippets/files/650021c3b6890663e22cc358`
    );

    expect(response.status).toBe(404);
  });

  it("should handle invalid parameters with HTTP 400", async () => {
    const response = await request(app).get(
      `/api/v1/public/snippets/files/${createdSnippetFile}?populate=snippet`
    );

    expect(response.status).toBe(400);
  });
});

describe("PATCH /api/v1/private/snippets/files/{id}", () => {
  it("should partially update a snippet file with HTTP 200", async () => {
    // Replace with a valid request body for partial update
    const requestBody = {
      content: "Updated content",
    };

    const response = await request(app)
      .patch(`/api/v1/private/snippets/files/${createdSnippetFile}`)
      .send(requestBody)
      .set("Authorization", `Bearer ${authToken}`); // Replace with a valid access token

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
  });

  it("should handle invalid request with HTTP 400", async () => {
    // Replace with an invalid request body
    const invalidRequestBody = {
      profile_id: "123124",
    };

    const response = await request(app)
      .patch(`/api/v1/private/snippets/files/${createdSnippetFile}`)
      .send(invalidRequestBody)
      .set("Authorization", `Bearer ${authToken}`); // Replace with a valid access token

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Bad Request");
  });

  it("should handle unauthorized request with HTTP 401", async () => {
    const requestBody = {
      content: "Updated content",
    };

    const response = await request(app)
      .patch(`/api/v1/private/snippets/files/${createdSnippetFile}`)
      .send(requestBody);

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Unauthorized");
  });

  it("should handle non-existing snippet file with HTTP 404", async () => {
    // Replace with a non-existing snippet file ID
    const nonExistingSnippetFileId = "650021c3b6890663e22cc358";

    const requestBody = {
      content: "Updated content",
    };

    const response = await request(app)
      .patch(`/api/v1/private/snippets/files/${nonExistingSnippetFileId}`)
      .send(requestBody)
      .set("Authorization", `Bearer ${authToken}`); // Replace with a valid access token

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Resource not found");
  });
});

describe("DELETE /api/v1/private/snippets/files/{id}", () => {
  it("should delete a snippet file with HTTP 204", async () => {
    const response = await request(app)
      .delete(`/api/v1/private/snippets/files/${createdSnippetFile}`)
      .set("Authorization", `Bearer ${authToken}`); // Replace with a valid access token

    expect(response.status).toBe(204);
    expect(response.body).toEqual({}); // Response body should be empty for a successful delete
  });

  it("should handle unauthorized request with HTTP 401", async () => {
    const response = await request(app).delete(
      `/api/v1/private/snippets/files/${createdSnippetFile}`
    );

    expect(response.status).toBe(401);
  });

  it("should handle non-existing snippet file with HTTP 404", async () => {
    const response = await request(app)
      .delete(`/api/v1/private/snippets/files/${createdSnippetFile}`)
      .set("Authorization", `Bearer ${authToken}`); // Replace with a valid access token

    expect(response.status).toBe(404);
  });
});
