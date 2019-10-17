const request = require('supertest'); // calling it "request" is a common practice
// const request = supertest(server)
const server = require('../server') // Link to your server file
const mothers = require('../mothers/mothers.spec.js')
const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development)


// const supertest = require('supertest')
/*
- when making a GET to the `/` endpoint 
  the API should respond with status code 200 
  and the following JSON object: `{ api: 'running' }`.
*/

describe('server.js', () => {
  // http calls made with supertest return promises, we can use async/await if desired
  describe('index route', () => {
    it('should return a a 400 for restricted route (page not found)', async () => {
      // do a get request to our api (server.js) and inspect the response
      const response = await request(server).get('/users');
      expect(response.status).toBe(400);

      // same test using promise .then() instead of async/await
      // let response;
      // return request(server).get('/').then(res => {
      //   response = res;
      //   expect(response.status).toEqual(expectedStatusCode);
      // })
    });

    // describe('endpoints', () => {
    //   describe('GET /', () => {

    //     //test for res.status
    //     it('should retun 200 ok ', async() => {
    //       const res = await request(server).get('/')
    //       expect(res.status).toBe(200)
    //     })


    //   }) 
    // })
    
    // This test fails because 1 !== 2
    it('Testing to see if Jest works', () => {
      expect(1).toBe(1)
    }) 
  });
});