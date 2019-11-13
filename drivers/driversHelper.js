const db = require("../data/dbConfig");

module.exports = {
  getDrivers,
  addDriver,
  updateDriver,
  deleteDriver,
  getDriverById,
  getDriverAvailability
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
  .first()
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

// Just getting driver availability
function getDriverAvailability() {
  return db("drivers")
    .where({availability: true})
    .select("id",
    "driver_name",
    "phone",
    "availability",
    "reliability",
    "latitude",
    "longitude"
    )
}
