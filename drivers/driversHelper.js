const db = require("../data/dbConfig");

module.exports = {
  getDrivers,
  addDriver,
  updateDriver,
  deleteDriver,
  getDriverById
};

function addDriver(data) {
  return db("drivers").insert(data, "id");
}

function getDrivers() {
  return db("drivers").select("*");
}

function getDriverById(id) {
  return db("drivers")
  .where({ id })
}

function updateDriver(id, data) {
  return db("drivers")
    .where({ id: id })
    .update(data);
}

function deleteDriver(id) {
  return db("drivers")
    .where({ id: id })
    .delete();
}
