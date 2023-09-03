/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
const ApiError = require("./apiErrorFormatter");

// List of methods for production
const duplicateKeyErrorDB = () => {
  const message = "Duplicate field value. Pls use different value";
  return new ApiError(message, 400);
};

// eslint-disable-next-line consistent-return
const sendDevelopementError = (err, req, res) => {
  // API Errors
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  // TODO: render error for PUG templates
};

const sendProductionError = (err, req, res) => {
  // API Errors
  if (req.originalUrl.startsWith("/api")) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    // TODO: LOG to DB - avoid leak implementation details
    console.log("ERROR ", err);
    return res.status(500).json({
      status: err.status,
      message: err.message,
    });
  }

  // TODO: render error for PUG templates
};

module.exports = (err, req, res) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "internal error";

  if (process.env.NODE_ENV === "developement") {
    sendDevelopementError(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;

    if (error.code === 11000) error = duplicateKeyErrorDB(error);
    sendProductionError(error, req, res);
  }
};
