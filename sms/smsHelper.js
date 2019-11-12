const db = require("../data/dbConfig");
const geo = require("../geolocation/geolib")
const moment = require('moment');

module.exports = {
  checkMotherRegistration,
  checkRideRequest,
  updatePendingRequest,
  findDriver,
  findDriverPhone,
  addMotherRideRequest,
  addDriverRideRequest,
  getRideByDriverId,
  getRideRequest,
  updateDriverAvailability,
  reassignFailedRides,
  getVillages,
  getVillageById,
  statusOnline,
  statusOffline
};


function checkMotherRegistration(number) {
  return db("mothers")
    .where({ phone_number: number })
    .select("id", "name", "phone_number", "village");
}

function checkRideRequest(data) {
  return db("rides")
    .where(data)
    .select("*");
}

function updatePendingRequest(id, data) {
  return db("rides").where({ id: id }, data);
}

//Had to get rid on village_id
function findDriver(id) {
  return db("drivers")
    .where({ availability: true })
    .select("id", "driver_name", "phone", "availability")
    .orderBy("reliability", "desc");
}

function findDriverPhone(data) {
  return db("drivers")
    .where(data)
    .select("id", "driver_name", "phone", "availability");
}

function addMotherRideRequest(data) {
  return db("rides").insert(data, "id");
}

function addDriverRideRequest(id, data) {
  // console.log("add driver request data", data)
  // console.log("add driver request id", id)
  return db("rides")
    .where({ id: id })
    .update(data)
    .select("*");
}

// drivers status
function updateDriverAvailability(id, data) {
  return db("drivers")
    .where({ id: id })
    .update(data)
    .select("*");
}

/** DON'T TOUCH THIS */
function getRideRequest() {
  return db("rides")
  .select("*");
}
// Get Rides by driver Id

function getRideByDriverId(id) {
  return db("rides")
  .where({driver_id:id, assigned: false})
  .select("*");
}


//Driver status:
function statusOnline(phoneNumber) {
  // console.log("Online", phoneNumber);
  return db("drivers")
    .where({ phone: phoneNumber })
    .update({ online: true, availability: true })
    .select("*");
}

function statusOffline(phoneNumber) {
  // console.log("Offline", phoneNumber);
  return db("drivers")
    .where({ phone: phoneNumber })
    .update({ online: false, availability: false })
    .select("*");
}

// Village Helpers
function getVillages() {
  return db("village").select("*");
}

function getVillageById(data) {
  return db("village")
    .where(data)
    .select("id", "name");
}

 
      

//** Chris-branch **//

// In order to do what we need to do, we have to go through a long chain of synchronous
// queries and updates

// this function attempts to do it all in one
function reassignFailedRides() {
  // first we find the failed rides, we're considering a ride as failed when
  // it isn't completed, it's assigned, and it was initiated longer than 5 minutes
  // ago
  return (
    db('rides')
      .where({ completed: false, assigned: false})

      // this is where we check if the initiated at time is over 5 minutes ago
      .andWhere(
        'initiated',
        '<',
        moment()
        .subtract(5, 'minutes')
        .format()
      )
      .select('id', 'mother_id', 'driver_id')
      .then(failedRides => {
        // go through the failed rides, mark their drivers as availability: false,
        // mark the ride as failed ( completed: true, but null for ended time)
        console.log('FAILED RIDES', failedRides.length);
        return db('drivers')
          .whereIn('id', failedRides.map(fr => fr.driver_id))
          .update({ availability: false })
          .then(() => {
            console.log('Did it make it here', failedRides.map(fr => fr.id));
            return db('rides')
              .whereIn(
                'id',
                failedRides.map(fr => fr.id)
                // ask how group indicates ride failure
              )
              .update({ completed: true }); // for now a ride that is completed but has no end time is a failed ride
          })
          .then(() => {
            console.log('second then');
            // here we query the failed rides again, this will prevent us from leaving previous failed rides
            // if we do a query like this, each time we run our checking script, previously failed rides will
            // have a chance to be assigned a driver

            // also for situations where there were not enough drivers for moms, they'll have a chance again
            return db('rides')
              .where({
                completed: true
              })
              .whereNull('ended')
              .select('*')
              .then(freshFailedRides => {
                console.log(' 3');
                // create a promise chain of unknown length, build it through a for loop,
                // then start it at the end of that loop.
                console.log('FreshFailed', freshFailedRides.length);
                // this is one way to synchronously run an unknown number of promises
                let chain = Promise.resolve();
                freshFailedRides.forEach(fr => {
                  console.log("Failed Rides Info", fr);
                  //losing the data. undefined
                  return (
                  chain = chain.then(res  => {
                    console.log("failed rides res", res)
                    return (
                      //Obsolete???? 
                      // reAssignMothers(fr)
                      
                      db('mothers')
                        .where({ id: fr.mother_id })
                        .then(m => {
                          console.log(' 4', m[0].village);
                          const mom = m[0].village;
                          return mom;
                          
                        })
                  
                        .then((mom) => geo.geoLocation(mom))
                        // restarts the rides
                        .then(driver => {
                          const newDriver = driver;
                          console.log("New Driver",newDriver)
                          // bail out if there aren't any drivers available
                          // this mom will have another chance when the script runs again
                          if (newDriver === undefined) {
                            return;
                          }

                          // otherwise, we found a driver, so update this mom's ride from failed
                          // to re-initiated

                          // also update the driver's availability to false
                          return db('rides')
                            .where({ id: fr.id })
                            .update({
                              completed: false,
                              driver_id: newDriver.id,
                              initiated: moment().format()
                            })
                            .then(() => {
                              // Here you would also send an SMS to tell this driver he has a new ride
                              
                              return db('drivers')
                                .where({ id: newDriver.id })
                                .update({
                                  availability: false
                                });
                            });
                        })
                    );
                  })
                  )
                });
                return chain;
              });
          });
      })
  );
}


