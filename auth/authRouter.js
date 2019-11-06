const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/usersHelper');
const secrets = require('../config/secrets');

router.post('/register', (req, res) => {
  let user = req.body;

  if (!user) {
    return res.status(400).json({ message: 'You need to register' });
  }

  if (!user.first_name && !user.last_name) {
    return res
      .status(400)
      .json({ message: `Your first and last name is required to register` });
  }

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
    // .catch(error => res.status(500).json(error) )
    .catch(error => {
      usernameTaken =
        'SQLITE_CONSTRAINT: UNIQUE constraint failed: users.username';
      if (error.toString().includes(usernameTaken)) {
        return res
          .status(400)
          .json({ message: `the username ${user.username} is not available` });
      }
      return res
        .status(500)
        .json({ message: `error adding new user: ${error}` });
    })
    .then(user => {
      // console.log('ADD USER ', user);
      res.status(201).json(user);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .catch(error => {
      res.status(500).json(error);
    })
    .then(users => {
      if (users.length === 0) {
        return res.status(404).json({
          message: `${username} is not registered`,
        });
      }

      const user = users[0];

      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'wrong password' });
      }

      const token = generateToken(user);

      res.status(200).json({
        message: `Welcome ${user.username}!`,
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        token,
      });
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
  };
  const options = {
    expiresIn: '1d',
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
