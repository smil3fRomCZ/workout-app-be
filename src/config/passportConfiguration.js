const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const { oauth: oauthConfiguration } = require("../config/configuration");
const User = require("../models/userModel");

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: oauthConfiguration.GOOGLE_CLIENT_ID,
      clientSecret: oauthConfiguration.GOOGLE_CLIENT_SECRET,
      callbackURL: oauthConfiguration.GOOGLE_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, done) {
      const currentUser = await User.findOne({ googleId: profile.id });

      if (currentUser) {
        return done(null, currentUser);
      }
      const newUser = await User.create({
        email: profile.emails[0].value,
        googleId: profile.id,
        nick_name: profile.displayName,
        first_name: profile.name.givenName,
        last_name: profile.name.familyName,
      });
      await newUser.save();
      done(null, newUser);
    }
  )
);
