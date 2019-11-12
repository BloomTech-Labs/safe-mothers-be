const db = require("../data/dbConfig");
const geolib = require('geolib');

module.exports = {
    geoLocation
}

// make function that will accept lat long
function motherLocation(village) {
    return db("village")
      .where({ id: village })
      .select("latitude", "longitude")
  }
  
  function driverLocation() {
    return db("drivers").select('id',"driver_name","latitude", "longitude", "availability","phone")
  }

async function geoLocation(motherVillageId){
    let driversArray = await driverLocation();
    let mothersArray =  await motherLocation(motherVillageId);
    console.log(mothersArray)
    // getting an array of drivers that are close to the mother
    let distance = geolib.orderByDistance(mothersArray[0], driversArray)
    // console.log("Order By Distance",distance)
    // Need a function here to search through distance to find which drivers are available.
    let availableDriversArray = [];
    distance.map( driver => {
      // console.log("Map", driver.availability)
      if(driver.availability === 1) {
      return availableDriversArray.push(driver)
    }
    })
    console.log("New Array",availableDriversArray)
    // Now we use geolib to find The nearest driver that is available.
    let getNearest = geolib.findNearest(mothersArray[0], availableDriversArray)
    console.log("Find Nearest",getNearest)
    return getNearest
}



