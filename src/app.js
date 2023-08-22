require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const errorhandler = require("./services/error/errorHandler");
const ApiError = require("./services/error/apiErrorFormatter");
const userRouter = require("./routers/userRouter");

const app = express();

// Configure middleware
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "developement") {
  app.use(morgan("short"));
}

// Routers
app.use("/api/v1/users", userRouter);

// Error handling
// Handle unknown routes
app.all("*", (req, res, next) => {
  next(new ApiError(`Route ${req.originalUrl} is not implemented!`, 404));
});

// Global error handler
app.use(errorhandler);

module.exports = app;
