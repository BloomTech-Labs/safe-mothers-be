const router = require("express").Router();
const Drivers = require("./driversHelper");

// register driver

router.post("/register", (req, res) => {
  let data = req.body;
  if (!data.driver_name || !data.phone) {
    res.status(400).json({ message: "Driver name and phone # required" });
  } else if (!data.latitude || !data.longitude) {
    res.status(400).json({ message: "Driver latitude & longitude required" });
  } else {
    Drivers.addDriver(data)
      .then(driver => {
        res.status(201).json({ message: "Added a driver" });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});

// get all the drivers
router.get("/", (req, res) => {
  Drivers.getDrivers()
    .then(drivers => {
      res.status(200).json(drivers);
    })
    .catch(err => res.status(500).json(err));
});

// get driver by id
router.get("/:id", async (req, res) => {
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
    .catch(err => res.status(500).json(err));
});

//Get drivers who are available for the dashboard
router.get("/available/drivers", (req, res) => {
  Drivers.getDriverAvailability()
    .then(available => {
      console.log(available);
      res.status(200).json(available);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// edit a driver based on ID
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;

  Drivers.updateDriver(id, data)
    .then(drivers => {
      res.status(200).json(drivers);
    })
    .catch(err => res.status(500).json(err));
});

// delete a driver based on ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Drivers.deleteDriver(id)
    .then(driver => {
      if (driver) {
        res.status(200).json({ message: `${id} deleted` });
      } else {
        res.status(404).json({ message: `No driver associated with id ${id}` });
      }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
