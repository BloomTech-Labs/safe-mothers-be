const db = require("../data/dbConfig");

module.exports = {
  checkMotherRegistration,
  checkPendingRequest,
  updatePendingRequest,
  findDriver,
  findDriverArray,
  findDriverPhone,
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

function updatePendingRequest(id, data) {
  return db("rides").where({ id: id }, data);
}

function findDriver(id) {
  return db("drivers")
    .where({ village_id: id, availability: true })
    .select("id", "name", "phone_number", "availability", "village_id")
    .max("reliability as reliability");
  // .orderBy("reliability", "desc");
}

function findDriverArray(id) {
  return db("drivers")
    .where({ village_id: id, availability: true })
    .select("id", "name", "phone_number", "availability", "village_id")
    .orderBy("reliability", "desc");
}

function findDriverPhone(data) {
  return db("drivers")
    .where(data)
    .select("id", "name", "phone_number", "availability");
}

function addMotherRideRequest(data) {
  return db("rides").insert(data, "id");
}

function addDriverRideRequest(id, driver_id) {
  return db("rides")
    .where({ id: id })
    .insert({ driver_id: driver_id });
}

// drivers status
function updateDriverAvailability(id, data) {
  return db("drivers")
    .where({ id: id })
    .update(data);
}
/** DONT TOUCH THIS */
function getRideRequest() {
  return db("rides").select("*");
}