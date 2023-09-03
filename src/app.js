/* eslint-disable import/no-extraneous-dependencies */
require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const { rateLimit } = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");

require("./config/passportConfiguration");

const errorhandler = require("./services/error/errorHandler");
const ApiError = require("./services/error/apiErrorFormatter");
const authGoogleRouter = require("./routers/authGoogleRouter");
const userRouter = require("./routers/userRouter");
const exerciseRouter = require("./routers/exerciseRouter");
const workoutRouter = require("./routers/workoutRouter");
const { sessionOptions } = require("./config/sessionConfiguration");

const app = express();
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

// Configure middleware
// Requests limiter configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});
app.use(limiter);

// Implement cors
app.use(cors());

// Data sanitization againts XSS

// Secure headers
app.use(helmet());

// Prevent NoSQL injections
app.use(mongoSanitize());

// Setup parsing JSON requests
app.use(express.json({ limit: "20kb" }));

// Parsing cookies
app.use(cookieParser());

// Turn logger in DEV env
if (process.env.NODE_ENV === "developement") {
  app.use(morgan("short"));
}

// DDoS for routers
app.use(hpp());

// Routers
app.use("/api/v1/auth", authGoogleRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/exercises", exerciseRouter);
app.use("/api/v1/workouts", workoutRouter);

// Error handling
// Handle unknown routes
app.all("*", (req, res, next) => {
  next(new ApiError(`Route ${req.originalUrl} is not implemented!`, 404));
});

// Global error handler
app.use(errorhandler);

module.exports = app;
