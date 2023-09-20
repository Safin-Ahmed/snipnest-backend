import dotenv from "dotenv";
dotenv.config();
import { clearAllData, connectDB, disconnectDB } from "../src/db";

import request from "supertest";
import app from "../src/app"; // Replace with your actual Express app instance

// Replace the following with your actual JWT tokens
let authToken;
let snippetId;

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await clearAllData();
  await disconnectDB();
});

// Get all snippets
describe("GET /api/v1/public/snippets", () => {
  it("should get all snippets", async () => {
    const response = await request(app).get("/api/v1/public/snippets");

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.pagination).toBeDefined();
    expect(response.body.links).toBeDefined();
    // Add more assertions here if needed
  });

  it("should get all snippets with correct pagination when page and limit are provided", async () => {
    const response = await request(app).get(
      "/api/v1/public/snippets?page=2&limit=10"
    );

    expect(response.statusCode).toBe(200);
    expect(response.body.pagination.page).toBe(2);
    expect(response.body.pagination.limit).toBe(10);
  });
});

// Create a snippet
describe("POST /api/v1/private/snippets", () => {
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

  it("should create a snippet", async () => {
    const snippetData = {
      title: "Test Code Snippet 3",
      description: "Test Code Snippet 3 Created By EH Safin Ahmed",
    };

    const response = await request(app)
      .post("/api/v1/private/snippets")
      .set("Authorization", `Bearer ${authToken}`)
      .send(snippetData)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(201);
    expect(response.body.code).toBe(201);
    expect(response.body.message).toBe("Snippet created successfully");
    expect(response.body.data).toBeDefined();
    expect(response.body.links).toBeDefined();

    snippetId = response.body.data.id;
  });
  it("should send 401 unauthorized response if no authorization token is provided", async () => {
    const snippetData = {
      title: "Test code snippet 3",
      description: "Test code snippet 3 created by EH Safin Ahmed",
    };

    const response = await request(app)
      .post("/api/v1/private/snippets")
      .set("Content-Type", "application/json")
      .send(snippetData);

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Unauthorized");
  });
});

// Get single snippet
describe("GET /api/v1/public/snippets/:snippetId", () => {
  it("should get a single snippet", async () => {
    const response = await request(app)
      .get(`/api/v1/public/snippets/${snippetId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.id).toBeDefined();
    expect(response.body.links).toBeDefined();
  });

  it("should expand the snipper object if query params are sent", async () => {
    const response = await request(app).get(
      `/api/v1/public/snippets/${snippetId}?expand=snipper`
    );

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.snipper).toBeDefined();
    expect(response.body.links).toBeDefined();
  });
});

// Update a snippet
describe("PATCH /api/v1/private/snippets/:snippetId", () => {
  let newAuthToken;
  beforeAll(async () => {
    await request(app).post("/api/v1/public/auth/register").send({
      username: "hmnayem",
      email: "hm@gmail.com",
      password: "Hmnayem2021!",
    });

    const loginResponse = await request(app)
      .post("/api/v1/public/auth/login")
      .send({
        email: "hm@gmail.com",
        password: "Hmnayem2021!",
      });

    newAuthToken = loginResponse.body.data.access_token;
  });
  it("should update a snippet", async () => {
    const updateData = {
      title: "updated title",
    };

    const response = await request(app)
      .patch(`/api/v1/private/snippets/${snippetId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .set("Content-Type", "application/json")
      .send(updateData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Snippet updated successfully");
    expect(response.body.data.title).toBe("updated title");
    expect(response.body.links).toBeDefined();
    // Add more assertions here if needed
  });

  it("should send a bad request if send invalid data", async () => {
    const updateData = {
      title: "updated title",
      totalComments: 100,
    };

    const response = await request(app)
      .patch(`/api/v1/private/snippets/${snippetId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send(updateData)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Bad Request");
  });

  it("should send authorization error if another user wants to update the snippet except the owner", async () => {
    const updateData = {
      title: "updated title by another user",
    };

    const response = await request(app)
      .patch(`/api/v1/private/snippets/${snippetId}`)
      .set("Authorization", `Bearer ${newAuthToken}`)
      .send(updateData)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(403);
    expect(response.body.error).toBe("Access Forbidden");
  });
});

// Get all comments for a snippet
describe("GET /api/v1/public/snippets/:snippetId/comments", () => {
  it("should get all comments for a snippet", async () => {
    const response = await request(app).get(
      `/api/v1/public/snippets/${snippetId}/comments`
    );

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.links).toBeDefined();
    // Add more assertions here if needed
  });
});

// Post a comment for a snippet
describe("POST /api/v1/private/snippets/:snippetId/comments", () => {
  it("should post a comment for a snippet", async () => {
    const commentData = {
      content: "Test Comment 3 By EH Safin",
    };

    const response = await request(app)
      .post(`/api/v1/private/snippets/${snippetId}/comments`)
      .set("Authorization", `Bearer ${authToken}`)
      .send(commentData)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(201);
  });
});

// Get all stars for a snippet
describe("GET /api/v1/public/snippets/:snippetId/stars", () => {
  it("should get all stars for a snippet", async () => {
    const response = await request(app).get(
      `/api/v1/public/snippets/${snippetId}/stars`
    );

    expect(response.status).toBe(200);
    // Add more assertions here if needed
  });
});

// Add a star to a snippet
describe("POST /api/v1/private/snippets/:snippetId/stars", () => {
  it("should add a star to a snippet", async () => {
    const response = await request(app)
      .post(`/api/v1/private/snippets/${snippetId}/stars`)
      .set("Authorization", `Bearer ${authToken}`)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(201);
  });
});

// Delete a snippet
describe("DELETE /api/v1/private/snippets/:snippetId", () => {
  let newAuthToken;
  beforeAll(async () => {
    await request(app).post("/api/v1/public/auth/register").send({
      username: "hmnayem",
      email: "hm@gmail.com",
      password: "Hmnayem2021!",
    });

    const loginResponse = await request(app)
      .post("/api/v1/public/auth/login")
      .send({
        email: "hm@gmail.com",
        password: "Hmnayem2021!",
      });

    newAuthToken = loginResponse.body.data.access_token;
  });
  it("should send authorization error if another user wants to delete the snippet except the owner", async () => {
    const response = await request(app)
      .delete(`/api/v1/private/snippets/${snippetId}`)
      .set("Authorization", `Bearer ${newAuthToken}`);

    expect(response.status).toBe(403);
    expect(response.body.error).toBe("Access Forbidden");
  });
  it("should delete a snippet", async () => {
    const response = await request(app)
      .delete(`/api/v1/private/snippets/${snippetId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(204);
    // Add more assertions here if needed
  });
});
