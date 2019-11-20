const db = require("../data/dbConfig");
const geo = require("../geolocation/geolib");
const moment = require("moment");
const smsFunctions = require("./smsFunctions");


module.exports = {
  checkMotherRegistration,
  findDriverPhone,
  getVillages,
  getVillageById,
  statusOnline,
  statusOffline,
  getRideRequest,
  addMotherRideRequest,
  addDriverRideRequest,
  checkRideRequest,
  updatePendingRequest,
  getRideByDriverId,
  updateDriverAvailability,
  reassignFailedRides,
};

<<<<<<< HEAD
=======
//Check if mother is registered
>>>>>>> 9b0b08f61f4ea7b1cc52655dfbbc51bad7d4b972
function checkMotherRegistration(number) {
  return db("mothers")
    .where({ phone_number: number })
    .select("id", "name", "phone_number", "village");
}

function findDriverPhone(data) {
  return db("drivers")
    .where(data)
    .select("id", "driver_name", "phone", "availability");
}

<<<<<<< HEAD
function updatePendingRequest(id, data) {
  return db("rides")
    .where({ id: id })
    .update(data);
=======
//Driver Clock In/Out:
function statusOnline(phoneNumber) {
  return db("drivers")
    .where({ phone: phoneNumber })
    .update({ online: true, availability: true })
    .select("*");
>>>>>>> 9b0b08f61f4ea7b1cc52655dfbbc51bad7d4b972
}

function statusOffline(phoneNumber) {
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


/****RIDE REQUEST HELPERS****/
/*DO NOT CHANGE */
function getRideRequest() {
  return db("rides")
  .select("*");
} 

function addMotherRideRequest(data) {
  return db("rides").insert(data, "id");
}

function addDriverRideRequest(id, data) {
  return db("rides")
    .where({ id: id })
    .update(data)
    .select("*");
}

function checkRideRequest(data) {
  return db("rides")
    .where(data)
    .select("*");
}

<<<<<<< HEAD
/** DON'T TOUCH THIS */
function getRideRequest() {
  return db("rides").select("*");
=======
function updatePendingRequest(id, data) {
  return db("rides").where({ id: id }).update(data);
>>>>>>> 9b0b08f61f4ea7b1cc52655dfbbc51bad7d4b972
}

// Get Rides by Driver Id
function getRideByDriverId(id) {
  return db("rides")
    .where({ driver_id: id, assigned: false })
    .select("*");
}

// Driver Availability
function updateDriverAvailability(id, data) {
  return db("drivers")
    .where({ id: id })
    .update(data)
    .select("*");
}


<<<<<<< HEAD
// In order to do what we need to do, we have to go through a long chain of synchronous
// queries and updates
=======
/**
 The following function/helper is used to find an available driver if the previous driver does not respond in 5 minutes. It is used in the the drivers reassign endpoint that is pinged every 5 minutes by a dyno called "set-time out" on heroku. It is currently shut off, and will need to be turned on to see this function in action. DON'T FORGOT TO TURN THE DYNO OFF WHEN FINISHED TESTING. 

 In order to ping the next closest driver if said driver does not respond to ride request , we have to go through a long chain of synchronous queries and updates. This function attempts to do it all in one. This needs to be refactored in the future.
**/
>>>>>>> 9b0b08f61f4ea7b1cc52655dfbbc51bad7d4b972

function reassignFailedRides() {
  /*First we find the failed rides where completed is false, assigned is false, and there is a driverId in the rides table */
  return (
<<<<<<< HEAD
    db("rides")
      .where({ completed: false, assigned: false })
      // this is where we check if the initiated at time is over 5 minutes ago
=======
    db('rides')
      .where({ completed: false, assigned: false})
      // this is where we check if the initiated at time is over 5 minutes ago using moment.
>>>>>>> 9b0b08f61f4ea7b1cc52655dfbbc51bad7d4b972
      .andWhere(
        "initiated",
        "<",
        moment()
          .subtract(5, "minutes")
          .format()
      )
      .select("id", "mother_id", "driver_id")
      .then(failedRides => {
<<<<<<< HEAD
        // go through the failed rides, mark their drivers as availability: false,
        // mark the ride as failed ( completed: true, but null for ended time)
        console.log("FAILED RIDES", failedRides.length);
        return db("drivers")
          .whereIn("id", failedRides.map(fr => fr.driver_id))
=======
        /*
         We go through the rides that have failed and mark the unresponsive drivers availability as false. **NOTE** Future build will need to figure out how to change their availability back to true after this first 5 minute check
         */
        console.log('FAILED RIDES', failedRides.length);
        return db('drivers')
          .whereIn('id', failedRides.map(fr => fr.driver_id))
>>>>>>> 9b0b08f61f4ea7b1cc52655dfbbc51bad7d4b972
          .update({ availability: false })
          .then(() => {
            console.log("Did it make it here", failedRides.map(fr => fr.id));
            return db("rides")
              .whereIn(
                "id",
                failedRides.map(fr => fr.id)
              )
              .update({ pending: true }); // driverId is in rides table, but they are not assigned
          })
<<<<<<< HEAD
          .then(res => {
            console.log("Failed Rides completed should be set to true", res);
            // here we query the failed rides again, this will prevent us from leaving previous failed rides
            // if we do a query like this, each time we run our checking script, previously failed rides will
            // have a chance to be assigned a driver

            // also for situations where there were not enough drivers for moms, they'll have a chance again
            return db("rides")
=======
          .then( (res) => {
            console.log('Failed Rides completed should be set to true', res);
            /*
             Here we query the failed rides again. We use the query to allow all failed rides, that may not get assigned a driver at the first pass, a chance to be reassigned each time our checking script runs. 
             This also allows for situations where there are not enough drivers to for pregnant mothers. It will give these requests a second chance.
             */
            
            return db('rides')
>>>>>>> 9b0b08f61f4ea7b1cc52655dfbbc51bad7d4b972
              .where({
                pending: true
              })
              .whereNull("ended")
              .select("*")
              .then(freshFailedRides => {
<<<<<<< HEAD
                console.log(" 3");
                // create a promise chain of unknown length, build it through a for loop,
                // then start it at the end of that loop.
                console.log("FreshFailed", freshFailedRides.length);
=======
                console.log(' 3');
                /*
                 Create a promise chain of unknown length, build it through a for loop, and start at the end of that loop.
                 */
                console.log('FreshFailed', freshFailedRides.length);
>>>>>>> 9b0b08f61f4ea7b1cc52655dfbbc51bad7d4b972
                // this is one way to synchronously run an unknown number of promises
                let chain = Promise.resolve();
                freshFailedRides.forEach(fr => {
                  console.log("Failed Rides Info", fr);
                  //losing the data. undefined
                  return (chain = chain.then(res => {
                    console.log("failed rides res", res);
                    return (
<<<<<<< HEAD
                      //Obsolete????
                      // reAssignMothers(fr)
                      db("mothers")
=======
                      db('mothers')
>>>>>>> 9b0b08f61f4ea7b1cc52655dfbbc51bad7d4b972
                        .where({ id: fr.mother_id })
                        .then(m => {
                          console.log(" 4", m[0].village);
                          const mom = m[0].village;
                          return mom;
                        })
<<<<<<< HEAD
                        .then(mom => geo.geoLocation(mom))
                        // restarts the rides
                        .then(driver => {
                          const newDriver = driver;
                          console.log("New Driver", newDriver);
                          // bail out if there aren't any drivers available
                          // this mom will have another chance when the script runs again
                          if (newDriver === undefined) {
                            return;
                          }

                          // otherwise, we found a driver, so update this mom's ride from failed
                          // to re-initiated

                          // also update the driver's availability to false
                          return db("rides")
=======
                        //use geoLocation function to find nearest driver to mother by lat/long coordinates
                        .then((mom) => geo.geoLocation(mom))
                        // restarts the rides
                        .then(driver => {
                          const newDriver = driver;
                          console.log("New Driver",newDriver)
                          /**
                           Bail out if there aren't any drivers available. This mother will have a second chance when the scrip runs again
                           */
                          if (newDriver === undefined) {
                            return;
                          }
                          /*
                          Otherwise, we found a driver, so update this mom's ride from failed to re-initiated. Also update the driver's availability to false.
                          */
                          return db('rides')
>>>>>>> 9b0b08f61f4ea7b1cc52655dfbbc51bad7d4b972
                            .where({ id: fr.id })
                            .update({
                              pending: false,
                              driver_id: newDriver.id,
                              initiated: moment().format()
                            })
<<<<<<< HEAD

                            .then(async () => {
                              // Here you would also send an SMS to tell this driver he has a new ride
=======
                            .then(async ()  => {
                              /*
                              We send and SMS to the newly assigned driver that he has a ride request, and how to accept it.
                              */
>>>>>>> 9b0b08f61f4ea7b1cc52655dfbbc51bad7d4b972
                              // console.log("Finding mother's number", fr.mother_id)
                            
                              let message = `${newDriver.driver_name}, you have a pending pickup request id of  ${fr.id}. To confirm type "yes/no pickupID" (example: yes 12)`;
                              smsFunctions.sendDataToFrontlineSMS(
                                message,
                                newDriver.phone
                              );

                              return db("drivers")
                                .where({ id: newDriver.id })
                                .update({
                                  availability: false
                                });
                            });
                        })
                    );
                  }));
                });
                return chain;
              });
          });
      })
  );
}
