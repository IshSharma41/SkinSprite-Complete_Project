const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
      const adminID = decoded.adminID;
      req.body.adminID = adminID;
      next();
    } else {
      res.send("You cannot edit this token.");
    }
  } else {
    res.send("Authorization Required");
  }
};

module.exports = { authenticate };