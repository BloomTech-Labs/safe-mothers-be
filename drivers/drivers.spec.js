const request = require("supertest"); // calling it "request" is a common practice
// const request = supertest(server)
const server = require("../server"); // Link to your server file
require("dotenv").config();
const testToken = process.env.TEST_TOKEN;
console.log(testToken);
// const supertest = require('supertest')
/*
- when making a GET to the `/` endpoint 
  the API should respond with status code 200 
  and the following JSON object: `{ api: 'running' }`.
*/

describe("server.js", () => {
  // http calls made with supertest return promises, we can use async/await if desired
  describe("index route", () => {
    it("should return a a 400 for restricted route (page not found)", async () => {
      // do a get request to our api (server.js) and inspect the response
      const response = await request(server).get("/users");
      expect(response.status).toBe(400);

      // same test using promise .then() instead of async/await
      // let response;
      // return request(server).get('/').then(res => {
      //   response = res;
      //   expect(response.status).toEqual(expectedStatusCode);
      // })
    });
    it("should return a response of 200 with test token", async () => {
      const response = await request(server).get("/drivers").set("Authorization", testToken);
      expect(response.status).toBe(200);
    })

    // This test fails because 1 !== 2
    it("Testing to see if Jest works", () => {
      expect(1).toBe(1);
    });
  });
});
