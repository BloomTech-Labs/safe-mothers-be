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
          // get the village number
          villageID = mother.village;
          findDriver(mother.village).then(driver => {
            console.log(driver);
          });
        });
      } else {
        res
          .status(400)
          .json({ message: "No phone number stored in the database" });
      }
    })
    .catch(err => res.status(500).json(err));
});

function findDriver(id) {
  return sms.findDriver(id);
}

function removeSpecialChar(num) {
  // remove whitespaces and + in the phone number
  var regexPhoneNumber = /[^A-Z0-9]+/gi;
  return num.replace(regexPhoneNumber, " ").trim();
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
