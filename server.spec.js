const server = require("./server.js");
const request = require("supertest");
const db = require("./data/dbConfig");

describe("the server", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("GET /", () => {
    it("should run the testing env", () => {
      expect(process.env.DB_ENV).toBe("test");
    });
    it("should return 200 status", async () => {
      const res = await request(server).get("/");
      expect(res.status).toBe(200);
    });

    it("should return the current object", async () => {
      let res = await request(server).get("/");
      expect(res.type).toBe("application/json");
      expect(res.body).toEqual({ api: "safe mothers" });
    });
  });
});
