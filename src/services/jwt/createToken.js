const jwt = require("jsonwebtoken");
const { JWT_MAXAGE, JWT_SECRET } = require("../../config/configuration");

module.exports = {
  createToken: (userData) =>
    jwt.sign({ userData }, JWT_SECRET, { expiresIn: JWT_MAXAGE }),
};
