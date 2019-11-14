const db = require("../db/dbConfig");

module.exports = {
  add,
  findBy
};

function add(user) {
  return db("users")
    .insert(user)
    .returning(["id", "username"]);
}

function findBy(filter) {
  return db("users").where(filter);
}
