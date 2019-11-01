const db = require("../data/dbConfig");

module.exports = {
  addMother,
  updateMother,
  deleteMother,
  getMothers,
  getMotherById,
  getMotherForDriver
};

function addMother(data) {
  return db("mothers").insert(data, "id");
}

function getMothers() {
  return db("mothers").select("*");
}

function getMotherById(id) {
  return db("mothers")
  .where({ id })
}

//Used for sms message to driver:
function getMotherForDriver(id) {
  return db("mothers")
  .where({ id: id })
  .select("name", "village", "phone_number")
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
