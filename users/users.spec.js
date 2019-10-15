const db = require('../data/dbConfig');
const users = require('./usersHelper');

beforeEach(async () => {
    await db('users').truncate();
});

describe('users', () => {
    const origin_user = {
        username: "krik13333",
        password: "krik13333",
        first_name: "Sasha",
        last_name: "Foksman",
    };
    const update_user = {
        username: "krik16666",
        password: "krik",
        first_name: "Sasha11",
        last_name: "Foksman11",
    };
    describe('insert', () => {
        it('Should insert the provided user into the db', async () => {
            const [user] = await users.addUser(origin_user);
            expect(user.username).toBe(origin_user.username);
        });
    });
    describe('update', () => {
        it('Should update the provided user in the db', async () => {
            const [addedUser] = await users.addUser(origin_user);
            await db('users')
                .where({id: addedUser.id})
                .update(update_user);
            const [user] = await users.findBy({id: addedUser.id});
            expect(user.username).toMatch(update_user.username);
        });
    });
    describe('delete', () => {
        it('Should delete the provided user in the db', async () => {
            const [addedUser] = await users.addUser(origin_user);
            const [user] = await users.findBy({id: addedUser.id});
            if (user) {
                const count = await users.deleteUser(addedUser.id);
                expect(count).toEqual(1);
            } else return null;
        })
    })
});