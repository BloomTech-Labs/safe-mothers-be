const request = require("supertest"); // calling it "request" is a common practice
const server = require("../server"); // Link to your server file
require("dotenv").config(); // needed to pull env variable
const testToken = process.env.TEST_TOKEN; // set test token

describe("drivers router", () => {
  // http calls made with supertest return promises, we can use async/await if desired
  describe("Get all drivers endpoint", () => {
    it("should return a a 400 for restricted route (page not found)", async () => {
      // do a get request to our api (server.js) and inspect the response
      const response = await request(server).get("/drivers");
      expect(response.status).toBe(400);
    });

    it("should return a response of 200 with test token", async () => {
      const response = await request(server)
        .get("/drivers")  // .set() must come after HTTP method 
        .set("Authorization", testToken);  //this is how you set auth header in supertest
      expect(response.status).toBe(200);
    });
  });
  describe("get driver by id", () => {
    it("should return a status of 400 without token", async () => {
      const response = await request(server).get("/drivers/1");
      expect(response.status).toBe(400);
    });
    it("should return a status of 200 with token", async () => {
      const response = await request(server)
        .get("/drivers/1")
        .set("Authorization", testToken);
      expect(response.status).toBe(200);
    });
    it("should respond with status 404 for non-valid id", async () => {
      const response = await request(server)
        .get("/drivers/700")
        .set("Authorization", testToken);
      expect(response.status).toBe(404);
    })
  });
});
