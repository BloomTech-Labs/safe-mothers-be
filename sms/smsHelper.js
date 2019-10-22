const db = require("../data/dbConfig");

module.exports = {
  checkMotherRegistration,
  findDriver
};

function checkMotherRegistration(number) {
  return db("mothers")
    .where({ phone_number: number })
    .select("name", "phone_number", "village");
}

function findDriver(id) {
  return db("drivers")
    .where({ village_id: id, availability: true })
    .max("reliability as reliability")
    .select("name", "phone_number", "availability");
}
