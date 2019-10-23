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
      // if registered and there is an item in the array
      if (registered && registered.length !== 0) {
        registered.map(mother => {
          // finding the driver and this is based from the availability, reliability, village_id
          findDriver(mother.village, mother.phone_number, mother.name);
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

router.post("/mothers/register/:phone_number/:name", (req, res) => {
  const { phone_number, name } = req.params;

  console.log(phone_number, name);
});

/*** FUNCTIONS */

function findDriver(motherVillage, motherPhone, motherName) {
  sms
    .findDriver(motherVillage)
    .then(drivers => {
      drivers.forEach(driver => {
        // make algorithm to check the status for availability in every 5 minutes
        // Perhaps make use of the setTimeout() js function. You give it a time interval after which you can call a function.
        // if there's no changes in the availability within 5 minutes, move to another index file

        setTimeout(function() {
          console.log(driver);
        }, 10 * 1000);

        // let message = `Hi! your driver will be ${driver.name} and his number is ${driver.phone_number}`;
        // console.log(message);
        // sendDataToFrontlineSMS(message, motherPhone);

        // let driverMessage = `Hi ${driver.name}, please pickup ${motherName} at ${motherVillage} please press 1 for yes and 0 for no. You have 5 minutes to response`;
        // console.log(driverMessage);
        // sendDataToFrontlineSMS(driverMessage, driver.phone_number);
      });
    })
    .catch(err => console.log(err));
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
