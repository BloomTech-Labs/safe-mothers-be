const server = require('../server');
const request = require('supertest');
const db = require('../data/dbConfig');

const user = {
    username: "Masha",
    password: "password",
    first_name: "Maria",
    last_name: "Ivanovna"
};
const credentials = {
    username: "admin",
    password: "password",
};

beforeEach(async () => {
    db.seed.run()
});

describe('auth users', () => {
    it('register', async () => {
        const req = await request(server)
            .post('/auth/register')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .send(user);
        expect(req.status).toBe(201)
    });
    it('login', async () => {
        const req = await request(server)
            .post('/auth/login')
            .send(credentials);
        expect(req.status).toBe(200)
    });
});