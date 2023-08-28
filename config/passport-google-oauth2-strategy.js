const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "156685969550-k42j9unov4agosopmc5entbs8pg2p5oc.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/users/auth/google/callback",
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

module.exports=passport;