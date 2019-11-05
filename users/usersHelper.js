const db = require("../data/dbConfig");

module.exports = {
  getUsers,
  addUser,
  findBy,
  updateUser,
  deleteUser
};

function getUsers() {
  return db("users").select("username", "first_name", "last_name");
}

function addUser(user) {
   return db('users')
     .insert(user, 'id')
     .then(ids => {
       const [id] = ids;
     return findUserId(id)
   .select('id', 'username', 'first_name', 'last_name')
    })
}



function findUserId(id) {
  return db("users").where({id}).first();
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
