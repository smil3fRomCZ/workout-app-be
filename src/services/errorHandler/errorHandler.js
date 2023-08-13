const ApiError = require("./apiErrorFormatter");

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

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "internal error";

  if (process.env.NODE_ENV === "developement") {
    // console.log(`ENV: ${process.env.NODE_ENV}`);
    // console.log(`ERR: ${err}`);
    sendDevelopementError(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    sendProductionError(err, req, res);
  }
};
