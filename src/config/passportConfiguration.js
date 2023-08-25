const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const { oauth: oauthConfiguration } = require("../config/configuration");

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: oauthConfiguration.GOOGLE_CLIENT_ID,
      clientSecret: oauthConfiguration.GOOGLE_CLIENT_SECRET,
      callbackURL: oauthConfiguration.GOOGLE_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      console.log("Start of auth...");
      console.log(profile);
      done(null, profile);
    }
  )
);
