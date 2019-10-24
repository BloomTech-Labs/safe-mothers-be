const db = require("../data/dbConfig");

module.exports = {
  checkMotherRegistration,
  checkPendingRequest,
  findDriver,
  addMotherRideRequest,
  addDriverRideRequest,
  getRideRequest,
  updateDriverAvailability
};

function checkMotherRegistration(number) {
  return db("mothers")
    .where({ phone_number: number })
    .select("name", "phone_number", "village", "id");
}

function checkPendingRequest() {
  return db("rides")
    .where({ assigned: false })
    .select("*");
}

function findDriver(id) {
  return db("drivers")
    .where({ village_id: id, availability: true })
    .select(
      "id",
      "name",
      "phone_number",
      "availability",
      "reliability",
      "village_id"
    )
    .max("reliability as reliability");
  // .orderBy("reliability", "desc");
}

function addMotherRideRequest(data) {
  return db("rides").insert(data, "id");
}

function addDriverRideRequest(id, driver_id) {
  return db("rides")
    .where({ id: id })
    .insert({ driver_id: driver_id });
}

function updateDriverAvailability(id, data) {
  return db("drivers")
    .where({ id: id })
    .update({ availability: data });
}
/** DONT TOUCH THIS */
function getRideRequest() {
  return db("rides").select("*");
}
