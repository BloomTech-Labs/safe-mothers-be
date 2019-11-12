const jwt = require("jsonwebtoken");

const secrets = require("../config/secrets.js");

const testToken = process.env.TEST_TOKEN || null;

module.exports = (req, res, next) => {
  // const token = req.header('x-auth-token')
  const token = req.headers.authorization;
  if (token === testToken) {
    req.user = { username: "testerosa" };
    next();
  } else if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ you: "The credentials provided are wrong" });
      } else {
        req.user = { username: decodedToken.username };
        next();
      }
    });
  } else {
    res.status(400).json({ message: "No Credential Provider" });
  }
};
