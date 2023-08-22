const jwt = require("jsonwebtoken");

const ApiError = require("../../services/error/apiErrorFormatter");
const { JWT_SECRET } = require("../../config/configuration");

exports.checkJwtAuthorization = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new ApiError("Unauthorized", 401);
  }

  jwt.verify(token, JWT_SECRET, (error, decoded) => {
    if (error) {
      throw new ApiError(error.message, 401);
    }

    req.user = decoded;
    next();
  });
};
