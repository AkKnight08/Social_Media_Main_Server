const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");
const env= require('./environment');
passport.use(
  new GoogleStrategy(
    {
      clientID: env.google_client_ID,
      clientSecret:env.google_client_Secret,
      callbackURL:env.google_call_back_URL
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        let user = await User.findOne({
          email: profile.emails[0].value,
        }).exec();

        if (user) {
          return done(null, user);
        } else {
          const newUser = {
            name: profile.displayName,
            email: profile.emails[0].value,
            password: crypto.randomBytes(20).toString("hex"),
          };

          user = await User.create(newUser);

          return done(null, user);
        }
      } catch (err) {
        console.log("Error in Google OAuth", err);
        return done(err);
      }
    }
  )
);

module.exports = passport;
