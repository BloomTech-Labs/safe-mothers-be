const router = require("express").Router();
const axios = require("axios");
const Mothers = require("../mothers/mothersHelper");
const Drivers = require("../drivers/driversHelper");
const sms = require("./smsHelper");
const smsFunctions = require("./smsFunctions")
const Fuse = require("fuse.js");
const geo = require('../geolocation/geolib');


// Misspell - this defaults to 'mother' instructions to press 1.
// router.get("/misspell/:phone_number", async (req, res) => {
//   try {
//     let { phone_number } = req.params;
//     let newNum = removeSpecialChar(phone_number);

//     let message = `Press 911 to call for a boda`;
//     console.log(message);
//     sendDataToFrontlineSMS(message, phone_number);
//     res.status(200).json({ message: "Calling for Boda" });
//   } catch (err) {
//     res.status(500).json(err);
//     console.log(err);
//   }
// });

/****MOTHERS SMS INTERACTIONS****/
// 1 ---> HELP
router.get("/mothers/help/:phone_number", async (req, res) => {
  try {
    // get the phone number from the link
    let { phone_number } = req.params;
    let newNum = smsFunctions.removeSpecialChar(phone_number);
    // check if mother is registered
    let registered = await sms.checkMotherRegistration(newNum);

    if (registered && registered.length !== 0 && registered !== undefined) {
      let motherVillageId = registered[0].village;
      // search drivers on the same village
      let drivers = await sms.findDriver(motherVillageId);
      let motherId = registered[0].id;
      let data = {
        mother_id: motherId,
        ended: null,
        completed: false,
        assigned: false
      };
      //geolocation:
      geo.geoLocation(motherVillageId);
      // sms
      //   .addMotherRideRequest(data)
      //   .then(request => {
      //     /** This is just temporary, we will do the 5 minutes response time filter */
      //     let message = `${drivers[0].name}, you have a pending pickup request id of  ${request}. To confirm type "yes/no pickupID" (example: yes 12)`;
      //     sendDataToFrontlineSMS(message, drivers[0].phone_number);

      //     let messageForMother = `Request has been received. Waiting for boda response.`;
      //     smsFunctions.sendDataToFrontlineSMS(messageForMother, newNum);
      //     // console.log(message);
      //     res.status(200).json(request);
      //   })
      //   .catch(err => console.log(err));
    } else {
      let message = `To register name please type 912 and your name. (example: 912 Abbo Zadzisai)`;
      // sendDataToFrontlineSMS(message, newNum);
      console.log(message);
      res.status(200).json({ message: "Sent text message to mother" });
    }
  }
  catch (err) {
    console.log(err);
  }
});

// 2 ---> REGISTER Mother's Name
router.get("/mothers/register/name/:phone_number", async (req, res) => {
  try {
    let { answer } = req.query;
    let { phone_number } = req.params;
    let newNum = smsFunctions.removeSpecialChar(phone_number);

    let registered = await sms.checkMotherRegistration(newNum);

    if (registered.length === 0 || registered === undefined) {
      let data = {
        name: answer,
        phone_number: newNum
      };

      Mothers.addMother(data)
        .then(mother => {
          let message = `To register your village, type 913 and your village name. (Example: 913 Iganga)`;
          smsFunctions.sendDataToFrontlineSMS(message, newNum);
          console.log(message);
          res.status(201).json(mother);
        })
        .catch(err => console.log(err));
    } else if (registered.length !== 0) {
      let message = `To register your village, type 913 and your village name. (Example: 913 Iganga)`;
      smsFunctions.sendDataToFrontlineSMS(message, newNum);
      console.log(message);
    } else {
      let message = `Sorry, we can't process that. To register please type 912 and your name. (Example: 912 Abbo Zadzisai)`;
      smsFunctions.sendDataToFrontlineSMS(message, newNum);
      console.log(message);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// 3 ---> REGISTER Mother's Village Name
router.get("/mothers/register/villageName/:phone_number", async (req, res) => {
  try {
    let { phone_number } = req.params;
    let newNum = smsFunctions.removeSpecialChar(phone_number);
    let { answer } = req.query;

    let motherInfo = await sms.checkMotherRegistration(newNum);
    let motherId = motherInfo[0].id;

    let villageList = await sms.getVillages();
    //fuse----> fuzzy search
    let options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ["name"]
    };

    let fuse = new Fuse(villageList, options);

    let result = fuse.search(answer);
    // if the village name is spelled correctly and matches the villages in the database
    if (answer.toLowerCase() === result[0].name.toLowerCase()) {
      let mothers_data = {
        village: result[0].id,
        phone_number: newNum
      };
      Mothers.updateMother(motherId, mothers_data)
        .then(mother => {
          let message =
            "You are now registered. Please text '911' to request a boda";
            smsFunctions.sendDataToFrontlineSMS(message, newNum);
          res.status(201).json(mother);
        })
        .catch(err => {
          res.status(500).json(err);
        });
      // If not, give mother village names to pick from
    } else if (
      answer.toLowerCase() !== result[0].name.toLowerCase() &&
      result[0].name !== undefined
    ) {
      const newSuggestions = result.map(async suggestions => {
        if (suggestions !== undefined) {
          return suggestions;
        }
      });

      Promise.all(newSuggestions).then(infos => {
        //Do mothers know the difference between village a and village b?
        let message2 = infos
          .slice(0, 4)
          .map(info => {
            return `"${info.id}" - ${info.name}\n`;
          })
          .join(", ");

        let message =
          "Please press 914 and: \n" + message2 + "\n(Example 914 5)";
        //send the information
        // console.log(message);
        smsFunctions.sendDataToFrontlineSMS(message, newNum);
        res.status(200).json({ message: "Message sent" });
      });
    } else if (result === undefined) {
      let message = `Sorry could not find village. Please try again ("Example: 913 Iganga") `;
      console.log(message);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//MOTHERS VILLAGE SELECTION RESPONSE TO SMS
router.get("/mothers/selection", async (req, res) => {
  try {
    let { phone_number, answer } = req.query;
    let newNum = smsFunctions.removeSpecialChar(phone_number);

    let motherInfo = await sms.checkMotherRegistration(newNum);
    let motherId = motherInfo[0].id;
    let villageId = parseInt(answer);

    let mother_data = {
      village: villageId
    };

    Mothers.updateMother(motherId, mother_data)
      .then(mother => {
        let message = `You are now registered! Please press 911 to call for a boda`;
        console.log(message);
        smsFunctions.sendDataToFrontlineSMS(message, newNum);
        res.status(202).json(mother);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


/****DRIVERS SMS INTERACTIONS****/

// DRIVERS RESPONSE TO THE MESSAGE
router.post(
  "/drivers/assign/:phone_number/:answer/:request_id",
  async (req, res) => {
    try {
      let { answer, request_id, phone_number } = req.params;
      phone_number = smsFunctions.removeSpecialChar(phone_number);
      answer = answer.toLowerCase();
      request_id = parseInt(request_id);

      console.log(phone_number + answer + request_id);

      let newPhone = { phone_number: phone_number };

      let driverInfo = await sms.findDriverPhone(newPhone);
      let rideInfo = await sms.getRideRequest(request_id);
      let motherInfo = await Mothers.getMotherForDriver(rideInfo[0].mother_id);
      let villageId = { id: motherInfo[0].village };
      let villageInfo = await sms.getVillageById(villageId);

      let rideId = parseInt(rideInfo[0].id);
      let driverId = parseInt(driverInfo[0].id);

      //if the driver press yes with the request ID then it will add to the rides table
      let updateRide = {
        driver_id: parseInt(driverInfo[0].id)
      };
      if (answer === "yes" && rideInfo[0].driver_id === null) {
        sms
          .addDriverRideRequest(rideId, updateRide)
          .then(request => {
            let update = {
              availability: false
            };
            smsFunctions.changeDriverAvailability(driverId, update);

            // send mothers information to driver
            if (motherInfo[0].name === null) {
              let message = `Emergency pickup request. Mother number is ${motherInfo[0].phone_number} and her village is ${villageInfo[0].name}`;
              smsFunctions.sendDataToFrontlineSMS(message, phone_number);
              console.log(message);
              res.status(200).json(request);
            } else {
              let message = `Please pick up ${motherInfo[0].name}. Her village is ${villageInfo[0].name} and her phone number is ${motherInfo[0].phone_number}`;
              smsFunctions.sendDataToFrontlineSMS(message, phone_number);
              console.log(message);
              res.status(200).json(request);
            }
          })
          .catch(err => console.log(err));
      }
      // if the driver choose no the availability value will be false
      else if (answer === "no") {
        let update = {
          availability: false
        };
        //The No trigger does not work: TypeError: Cannot read property 'then' of undefined  ---> need to push changes
        smsFunctions.changeDriverAvailability(driverId, update);
      }
      //This is looping on sms
      // if the driver choose yes but the ride table is complete already send info to the driver
      else if (answer === "yes" && rideInfo[0].driver_id !== null) {
        sms
          .getRideRequest()
          .then(request => {
            // FRONT LINE TEXT
            let message = `Sorry, this request is closed already`;
            smsFunctions.sendDataToFrontlineSMS(message, phone_number);
            res.status(200).json({ message: "request is closed already" });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
      }
      // make else if for lat and long if there is no driver available on the same village id
      else if (answer !== "yes" || answer !== "no") {
        sms
          .getRideRequest()
          .then(request => {
            let message = `Something is wrong please send your response: answer requestID (example: yes 12)`;
            smsFunctions.sendDataToFrontlineSMS(message, phone_number);
            res
              .status(200)
              .json({ message: "Something is wrong with your response" });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
      }
    } catch (error) {
      console.log(error);
    }
  }
);


// get all mothers
router.get("/mothers", (req, res) => {
  Mothers.getMothers()
    .then(mothers => {
      res.status(200).json(mothers);
    })
    .catch(err => res.status(500).json(err));
});

// updating driver online/offline status
router.put("/checkonline/:phone_number/:answer", (req, res) => {
  let phone_number = smsFunctions.removeSpecialChar(req.params.phone_number);
  let answer = req.params.answer.toLowerCase();
  if (answer === "online") {
    sms
      .statusOnline(phone_number)
      .then(clockedIn => {
        let message = `You are now clocked in`;
        smsFunctions.sendDataToFrontlineSMS(message, phone_number);
        res.status(200).json(clockedIn);
      })
      .catch(err => console.log(err));
  }
  if (answer === "offline") {
    sms
      .statusOffline(phone_number)
      .then(clockedOut => {
        let message = `You are now clocked out`;
        smsFunctions.sendDataToFrontlineSMS(message, phone_number);
        res.status(200).json(clockedOut);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
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



module.exports = router;
