const authGoogleRouter = require("express").Router();
const passport = require("passport");

// Google login route
authGoogleRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

// Callback route for oauth
authGoogleRouter.get(
  "/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.send("All done!");
  },
);

module.exports = authGoogleRouter;
