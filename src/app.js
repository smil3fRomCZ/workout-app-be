require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");

require("./config/passportConfiguration");
const errorhandler = require("./services/error/errorHandler");
const ApiError = require("./services/error/apiErrorFormatter");
const authGoogleRouter = require("./routers/authGoogleRouter");
const userRouter = require("./routers/userRouter");

const app = express();
app.use(session({ secret: "test", saveUninitialized: false, resave: false }));
app.use(passport.initialize());
app.use(passport.session());

// Configure middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Turn logger in DEV env
if (process.env.NODE_ENV === "developement") {
  app.use(morgan("short"));
}

// Routers
app.use("/api/v1/auth", authGoogleRouter);
app.use("/api/v1/users", userRouter);

// Error handling
// Handle unknown routes
app.all("*", (req, res, next) => {
  next(new ApiError(`Route ${req.originalUrl} is not implemented!`, 404));
});

// Global error handler
app.use(errorhandler);

module.exports = app;
