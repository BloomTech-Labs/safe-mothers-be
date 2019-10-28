const db = require('../data/dbConfig');

module.exports = {
  checkMotherRegistration,
  checkRideRequest,
  updatePendingRequest,
  findDriver,
  findDriverArray,
  findDriverPhone,
  addMotherRideRequest,
  addDriverRideRequest,
  getRideRequest,
  updateDriverAvailability,
  statusOnline,
  statusOffline
};

function checkMotherRegistration(number) {
  return db('mothers')
    .where({ phone_number: number })
    .select('id', 'name', 'phone_number', 'village');
}

function checkRideRequest(data) {
  return db('rides')
    .where(data)
    .select('*');
}

function updatePendingRequest(id, data) {
  return db('rides').where({ id: id }, data);
}

function findDriver(id) {
  return db('drivers')
    .where({ village_id: id, availability: true })
    .select('id', 'name', 'phone_number', 'availability', 'village_id')
    .max('reliability as reliability');
  // .orderBy("reliability", "desc");
}

function findDriverArray(id) {
  return db('drivers')
    .where({ village_id: id, availability: true })
    .select('id', 'name', 'phone_number', 'availability', 'village_id')
    .orderBy('reliability', 'desc');
}

function findDriverPhone(data) {
  return db('drivers')
    .where(data)
    .select('id', 'name', 'phone_number', 'availability');
}

function addMotherRideRequest(data) {
  return db('rides').insert(data, 'id');
}

function addDriverRideRequest(id, data) {
  return db('rides')
    .where({ id: id })
    .update(data);
}

// drivers status
function updateDriverAvailability(id, data) {
  return db('drivers')
    .where({ id: id })
    .update(data)
    .select('*');
}
/** DONT TOUCH THIS */
function getRideRequest() {
  return db('rides').select('*');
}

//** on/offline **/

function statusOnline(phoneNumber, answer) {
  console.log('Online', phoneNumber);
  return db('drivers')
    .where({ phone_number: phoneNumber })
    .update({ availability: true })
    .select('*');

}
function statusOffline(phoneNumber, answer) {
  return db('drivers');
  console.log('Offline', phoneNumber)
    .where({ phone_number: phoneNumber })
    .select('*')
    .update({ availability: false });
}
