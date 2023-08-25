const authGoogleRouter = require("express").Router();
const passport = require("passport");

authGoogleRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authGoogleRouter.get(
  "/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    console.log("Auth redirect");
    res.send("All done!");
  }
);

module.exports = authGoogleRouter;
