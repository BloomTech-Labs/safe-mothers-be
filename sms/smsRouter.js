const router = require("express").Router();
const axios = require("axios");
const Mothers = require("../mothers/mothersHelper");
const Drivers = require("../drivers/driversHelper");
const sms = require("./smsHelper");

// HELP

router.get("/mothers/help/:phone_number", (req, res) => {
  // get the phone number from the link
  let { phone_number } = req.params;
  let newNum = removeSpecialChar(phone_number);

  sms
    .checkMotherRegistration(newNum)
    .then(registered => {
      if (registered && registered.length !== 0) {
        registered.map(mother => {
          let data = {
            mother_id: mother.id,
            mother_name: mother.name,
            mother_village_id: mother.village,
            mother_phone_number: mother.phone_number,
            completed: false,
            assigned: false
          };
          addMotherRideRequest(data).then(request => {
            return request;
          });
          let message = `You are registered! Type NEXT to continue`;
          // sendDataToFrontlineSMS(message, phone_number);
          console.log(message);

          res.status(200).json(mother);
        });
      } else {
        let message = `To register type "register villagename" (example: register uganga)`;
        // sendDataToFrontlineSMS(message, phone_number);
        console.log(message);
        res.status(400).json({
          message: `To register type "register villagename" (example: register uganga)`
        });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// router.post(
//   "/drivers/assign/:phone_number/:answer/:request_id",
//   async (req, res) => {
//     /**
//      * 1. phone_number, assigned (0-1)
//      * 2. find the driver in teh drivers table using the phone number
//      * 2. checkPendingRequest -> rides table
//      * 3. if/else (1 -> updatePendingRequest -> rides table)
//      * 4. if press 1 -> updateDriverAvailability -> false
//      * 5. text about mothers information
//      */
//     try {
//       let { answer, request_id, phone_number } = req.params;
//       phone_number = removeSpecialChar(phone_number);
//       answer = answer.toLowerCase();
//       request_id = parseInt(request_id);

//       let data = {
//         phone_number: phone_number
//       };
//       if (answer === "yes") {
//         let ridesRequest = await sms.checkPendingRequest();
//         let driverInfo = await sms.findDriverPhone(data);

//         driverInfo.map(driver => {
//           let updateDriver = {
//             availability: false
//           };

//           sms.updateDriverAvailability(driver.id, updateDriver);
//           let updateDriverData = {};
//           sms.updatePendingRequest(request_id);
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   let data = {

//     phone_number: phone_number
//   };
//   let ridesRequest = await sms.checkPendingRequest();
//   let driverPhone = await sms.findDriverPhone(data);

//   ridesRequest.forEach(request => {
//     driverPhone.map();
//     if (num === 1) {
//       // sms.updatePendingRequest(request.id, )
//     }
//   });
// } catch (error) {
//   console.log(error);
// }
//   }
// );

/** LOOP SEQUENCE FOR FINDING DRIVER */
// router.get("/mothers/next/:phone_number", async (req, res) => {
//   try {
//     let pendingRequest = await sms.checkPendingRequest();
//     pendingRequest.map(request => {
//       sms.findDriverArray(request.mother_village_id).then(drivers => {
//         let i = drivers.length;
//         promiseWhile(
//           //condition
//           function() {
//             return i > 0 && request.assigned === 0;
//           },
//           // body
//           function() {
//             return new Promise((resolve, reject) => {
//               setTimeout(() => {
//                 findDriver(request.mother_village_id).then(driverInfos => {
//                   driverInfos.map(driver => {
//                     let id = driver.id;
//                     let availabilty = { availabilty: false };
//                     updateDriverAvailability(id, availabilty);
//                     let message = `Hi! ${driver.name}! You have a pickup request, request number: ${request.id}.
//                       Type Yes or No together with the request id . Example: "Yes 12"`;
//                     // sendDataToFrontlineSMS(message, phone_number);

//                     // to consider: what will happen if the driver declined the request
//                     // if there is no driver found through the village id list (null) then search for the nearest (LAT, LONG)
//                     console.log(message);

//                     // getting a sql error
//                   });
//                 });
//                 i--;
//                 resolve();
//               }, 5 * 1000);
//             });
//           }
//         );
//         res.status(200).json(drivers);
//       });
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

function promiseWhile(condition, body) {
  return new Promise((resolve, reject) => {
    function loop() {
      Promise.resolve(condition()).then(function(result) {
        if (!result) {
          resolve();
        } else {
          Promise.resolve(body()).then(loop, reject);
        }
      });
    }

    loop();
  });
}

async function updatePendingRequest(id, data) {
  return await sms.updatePendingRequest(id, data);
}

function updateDriverAvailability(id, data) {
  return sms.updateDriverAvailability(id, data).then(results => {
    return results;
  });
}

/*** FUNCTIONS */
function addMotherRideRequest(id) {
  return sms.addMotherRideRequest(id);
}

function addDriverRideRequest(id, driver_id) {
  sms.addDriverRideRequest(id, driver_id).then(driver => driver);
}

async function findDriver(mother_village_id) {
  return await sms.findDriver(mother_village_id);
}

function removeSpecialChar(num) {
  // remove whitespaces and + in the phone number
  var regexPhoneNumber = /[^A-Z0-9]+/gi;
  return num.replace(regexPhoneNumber, " ").trim();
}

/** MAKE SURE YOU HAVE THE .env FILE */
function sendDataToFrontlineSMS(message, phone_number) {
  let payload = {
    apiKey: process.env.FRONTLINE_KEY,
    payload: {
      message: message,
      recipients: [{ type: "mobile", value: `+${phone_number}` }]
    }
  };
  let url = "https://cloud.frontlinesms.com/api/1/webhook";
  axios.post(url, payload);
}

// get all mothers
router.get("/mothers", (req, res) => {
  Mothers.getMothers()
    .then(mothers => {
      res.status(200).json(mothers);
    })
    .catch(err => res.status(500).json(err));
});

// get all the drivers
router.get("/drivers", (req, res) => {
  Drivers.getDrivers()
    .then(drivers => {
      res.status(200).json(drivers);
    })
    .catch(err => res.status(500).json(err));
});

router.get("/rides", (req, res) => {
  sms
    .getRideRequest()
    .then(rides => res.status(200).json(rides))
    .catch(err => res.status(500).json(err));
});

// // register mother through SMS
// router.post("/mothers/register/:phone_number/:village_id", (req, res) => {
//   let phone_number = req.params.phone_number;
//   let village_id = parseInt(req.params.village_id);

//   let data = { phone_number: phone_number, village_id: village_id };
//   Mothers.addMother(data)
//     .then(mother => {
//       res.status(201).json({ message: "Added a mother" });
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });

//   let payload = {
//     apiKey: process.env.FRONTLINE_KEY,
//     payload: {
//       message: "Hi people!",
//       recipients: [{ type: "mobile", value: "+699699699" }]
//     }
//   };
//   let url = "https://cloud.frontlinesms.com/api/1/webhook";
//   axios.post(url, payload);
// });

// // type next to continue

module.exports = router;
