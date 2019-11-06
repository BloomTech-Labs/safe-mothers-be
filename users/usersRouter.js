const router = require("express").Router();

const Users = require("./usersHelper");



// get users
router.get("/", (req, res) => {
  Users.getUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "Error getting users" });
    })
    
});

// get single user
router.get("/:id", (req, res) => {
  let { id } = req.params;

  Users.findBy({ id })
    .then(users => {
      if (users.length === 0) {
        return res
          .status(404)
          .json({ message: `No user with the ID of ${id}` });
      }

      const user = users[0];
      res.status(200).json({
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username
      });
    })
    .catch(error => {
      res.status(500).json(error);
    })
   
});

// edit a user based on ID
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;

  Users.updateUser(id, data)
    .then(users => {
      res.status(200).json({ message: 'user edited' });
    })
    .catch(err => res.status(500).json(err));
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Users.deleteUser(id)
    .then(numChanges => {
      if (numChanges === 0) {
        return res
          .status(404)
          .json({ message: `Could not delete user with ID ${id}` });
      } else {
        return res
          .status(200)
          .json({ message: `User with ID ${id} has been deleted` });
      }
    })
    .catch(err => {
      res.status(500).json({ message: `Error deleting user: ${err}` });
    })

});

module.exports = router;

