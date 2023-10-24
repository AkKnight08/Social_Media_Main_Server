const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const User = require("../models/user");
const env= require('./environment');
let ops = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.jwt_key,
};

passport.use(
  new JWTStrategy(ops, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload._id);

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      console.log("Error in finding user from JWT", err);
      return done(err, false);
    }
  })
);

module.exports=passport;