const db = require("../data/dbConfig");

module.exports = {
  getUsers,
  addUser,
  findBy,
  updateUser,
  deleteUser
};

function getUsers() {
  return db("users").select("id","username", "first_name", "last_name");
}

async function addUser(user) {
  let ids = await db("users").insert(user, "id");
  const [id] = ids;
  return findBy({ id });
}

function findBy(filter) {
  return db("users").where(filter);
}

function updateUser(id, data) {
  return db("users")
    .where({ id: id })
    .update(data);
}

function deleteUser(id) {
  return db("users")
    .del()
    .where({ id });
}
