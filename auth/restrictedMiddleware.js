const jwt = require("jsonwebtoken");

const secrets = require("../config/secrets.js");
require("dotenv").config();

const testToken = process.env.TEST_TOKEN || null; //get test token from env
module.exports = (req, res, next) => {
  // const token = req.header('x-auth-token')
  const token = req.headers.authorization;
  if (token) {
    if (token === testToken) { //check if test token
      req.user = { username: "testerosa" };
      next();
    } else {
      jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
        if (err) {
          res.status(401).json({ you: "The credentials provided are wrong" });
        } else {
          req.user = { username: decodedToken.username };
          next();
        }
      });
    }
  } else {
    res.status(400).json({ message: "No Credential Provided" });
  }
};
