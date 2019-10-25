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

// type next to continue
let RSVP = require("RSVP");
router.get("/mothers/next/:phone_number", (req, res) => {
  sms.checkPendingRequest().then(request => {
    if (request[0].assigned === 0) {
      request.map(driver => {
        let i = 0;
        promiseWhile(
          function() {
            return driver.assigned === 0;
          },
          function() {
            return new RSVP.Promise(function(resolve, reject) {
              setTimeout(function() {
                i++;
                findDriver(driver.mother_village_id).then(data => {
                  let id = data[0].id;
                  let availabilty = { availabilty: false };
                  updateDriverAvailability(id, availabilty);
                  let message = `Hi! ${data[0].name}! You have a pickup request. Do you want to accept request? Press 1 for Yes and 0 for No`;
                  // sendDataToFrontlineSMS(message, phone_number);
                  console.log(message);
                });
                resolve();
              }, 5 * 1000);
            });
          }
        ).then(function() {
          alert("done");
        });
      });
    }
  });
});

function updateDriverAvailability(id, data) {
  return sms.updateDriverAvailability(id, data).then(results => {
    return results;
  });
}

function promiseWhile(condition, body) {
  return new RSVP.Promise(function(resolve, reject) {
    function loop() {
      RSVP.Promise.resolve(condition()).then(function(result) {
        // When the result of calling `condition` is no longer true, we are done.
        if (!result) {
          resolve();
        } else {
          // When it completes loop again otherwise, if it fails, reject
          RSVP.Promise.resolve(body()).then(loop, reject);
        }
      });
    }

    // Start running the loop
    loop();
  });
}

/*** FUNCTIONS */
function addMotherRideRequest(id) {
  return sms.addMotherRideRequest(id);
}

function addDriverRideRequest(id, driver_id) {
  sms.addDriverRideRequest(id, driver_id).then(driver => driver);
}

function findDriver(mother_village_id) {
  return sms.findDriver(mother_village_id).then(driver => {
    return driver;
  });
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

module.exports = router;