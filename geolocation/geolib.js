const db = require("../data/dbConfig");
const geolib = require('geolib');

module.exports = {
    geoLocation
}
// Gathers mothers village lat/long
function motherLocation(village) {
    return db("village")
      .where({ id: village })
      .select("latitude", "longitude")
  }
  
  //Gathers drivers info
  function driverLocation() {
    return db("drivers").select('id',"driver_name","latitude", "longitude", "availability","phone")
  }

  //library: https://www.npmjs.com/package/geolib
async function geoLocation(motherVillageId){
    let driversArray = await driverLocation();
    let mothersArray =  await motherLocation(motherVillageId);
    // getting an array of drivers from closest to farthest from mothers location and putting them in order
    let distance = geolib.orderByDistance(mothersArray[0], driversArray)

    // Map through drivers and returns an array drivers who's availability === true
    let availableDriversArray = [];
    distance.map( driver => {
      //If testing in localhost, boolean value must be set to 1. Otherwise in heroku the value must be set to true
      if(driver.availability === true || driver.availability === 1) {
      return availableDriversArray.push(driver)
    }
    })
    // Use the new availableDriversArray to find the single closest driver so they may receive a ride request
    let getNearest = geolib.findNearest(mothersArray[0], availableDriversArray)

    return getNearest
}



