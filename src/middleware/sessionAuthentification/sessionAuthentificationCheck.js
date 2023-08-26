const ApiError = require("../../services/error/apiErrorFormatter");

module.exports = (req, res, next) => {
  if (req.session.userId || req.session.passport?.user) {
    next();
  } else {
    next(new ApiError("You are not authorized, please log in!", 401));
  }
};
