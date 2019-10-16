const db = require("../data/dbConfig");

module.exports = {
  addMother,
  updateMother,
  deleteMother,
  getMothers
};

function addMother(data) {
  return db("mothers").insert(data, "id");
}

function getMothers() {
  return db("mothers").select("*");
}

function updateMother(id, data) {
  return db("mothers")
    .where({ id: id })
    .update(data);
}

function deleteMother(id) {
  return db("mothers")
    .where({ id: id })
    .delete();
}
