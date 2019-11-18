const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../users/usersHelper");
const secrets = require("../config/secrets");
const mw = require('./registerMiddleware')

router.post("/register", mw.validateUniqueUsername, (req, res) => {
  let user = req.body;

  if (!user) {
    return res.status(400).json({ message: "You need to register" });
  }

  if (!user.first_name && !user.last_name) {
    console.log("First and last")
    return res
      .status(400)
      .json({ message: `Your first and last name is required to register` });
  }
//
  if (!user.username) {
    return res
      .status(400)
      .json({ message: `You need a user name to register` });
  }

  if (!user.password) {
    return res.status(400).json({ message: `You need a password to register` });
  }

  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.addUser(user)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      console.log(error)
      return res.status(500).json({ message: `Could not add this user` });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  Users.findBy({ username })
    .then(users => {
      if (users.length === 0) {
        return res.status(404).json({
          message: `${username} is not a registered user`,
        })
      }
      const user = users[0];
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken({ user });
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          token,
        });
      } else {
        return res.status(401).json({ message: 'Incorrect password' });
      }

    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function generateToken(user) {
  const payload = {
    // subject: user.id,
    username: user.username
    // first_name: user.first_name,
    // last_name: user.last_name,
  };
  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
