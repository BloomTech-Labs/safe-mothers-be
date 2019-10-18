const router = require("express").Router();
const axios = require("axios");
const Drivers = require("../drivers/driversHelper");
const Mothers = require("../mothers/mothersHelper");

//Unprotected Driver Routes, SMS Functionaity

// register driver
router.post("/drivers/register", (req, res) => {
  let data = req.body;

  Drivers.addDriver(data)
    .then(driver => {
      res.status(201).json({ message: "Added a driver" });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// get all the drivers
router.get("/drivers", (req, res) => {
  Drivers.getDrivers()
    .then(drivers => {
      res.status(200).json(drivers);
    })
    .catch(err => res.status(500).json(error));
});

// get driver by id
router.get("/drivers/:id", async (req, res) => {
  const { id } = req.params;
  Drivers.getDriverById(id)
    .then(drivers => {
      if (drivers) {
        res.status(200).json(drivers);
      } else {
        res
          .status(404)
          .json({ message: "Could not find driver with associated id." });
      }
    })
    .catch(err => res.status(500).json(error));
});

// edit a driver based on ID
router.put("/drivers/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;

  Drivers.updateDriver(id, data)
    .then(drivers => {
      res.status(200).json(drivers);
    })
    .catch(err => res.status(500).json(err));
});

// delete a driver based on ID
router.delete("/drivers/:id", (req, res) => {
  const { id } = req.params;

  Drivers.deleteDriver(id)
    .then(drivers => {
      res.status(200).json({ message: "Driver deleted!" });
    })
    .catch(err => res.status(500).json(err));
});

//Unprotected Mother Routes, SMS Functionaity

// register mother through SMS
router.post("/mothers/register/:phone_number/:village_id", (req, res) => {
  let phone_number = req.params.phone_number;
  let village_id = parseInt(req.params.village_id);

  let data = { phone_number: phone_number, village_id: village_id };

  Mothers.addMother(data)
    .then(mother => {
      res.status(201).json({ message: "Added a mother" });
    })
    .catch(err => {
      res.status(500).json(err);
    });

  let message = "This is just a test so dont worry!";
  let payload = {
    apiKey: process.env.FRONTLINE_KEY,
    payload: {
      message: message,
      recipients: [{ type: "mobile", value: message }]
    }
  };
  let url = "https://cloud.frontlinesms.com/api/1/webhook";
  axios.post(url, payload);
});

// get all mothers
router.get("/mothers", (req, res) => {
  Mothers.getMothers()
    .then(mothers => {
      res.status(200).json(mothers);
    })
    .catch(err => res.status(500).json(err));
});

// get mothers by id
router.get("/mothers/:id", async (req, res) => {
  const { id } = req.params;
  Mothers.getMotherById(id)
    .then(mothers => {
      if (mothers) {
        res.status(200).json(mothers);
      } else {
        res
          .status(404)
          .json({ message: "Could not find mother with associated id." });
      }
    })
    .catch(err => res.status(500).json(error));
});

// edit a mother based on ID
router.put("/mothers/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;

  Mothers.updateMother(id, data)
    .then(mothers => {
      res.status(200).json(mothers);
    })
    .catch(err => res.status(500).json(err));
});

// delete a mother based on ID
router.delete("/mothers/:id", (req, res) => {
  const { id } = req.params;

  Mothers.deleteMother(id)
    .then(mothers => {
      res.status(200).json({ message: "mother deleted!" });
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
