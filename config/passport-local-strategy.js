const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user"); // Make sure to provide the correct path

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async function (email, password, done) {
      try {
        const user = await User.findOne({ email: email });
        if (!user || user.password !== password) {
          console.log("Invalid Username/Password");
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        console.log("Error in finding user -> Passport");
        return done(error);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    return done(null, user);
  } catch (error) {
    console.log("Error in finding user -> Passport");
    return done(error);
  }
});

// Custom middleware to check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/users/sign-in");
};

// Custom middleware to set authenticated user in res.locals
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next(); // Make sure to call next() to move to the next middleware/route
};

module.exports = passport;
