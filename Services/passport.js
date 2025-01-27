import passport from "passport";
import { userModelClass } from "../models/userModel.js";
import { secretKey } from "../config.js";
import { Strategy, ExtractJwt } from "passport-jwt";
import LocalStrategy from "passport-local";
// set options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: secretKey,
};

//local login
let localOptions = { userNameField: "email" };
export const localLogin = new LocalStrategy(
  localOptions,
  (email, password, done) => {
    /// ///
  }
);

// Create JWT Strategy
export const jwtLogin = new Strategy(jwtOptions, (payload, done) => {
  // see if user id exist in our database
  // if it does call 'done' with that other
  // if not call 'done' without user object

  userModelClass.findById(payload.sub).then((err, user) => {
    if (err) return done(err, false);
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// tell passport to use strategy

passport.use(jwtLogin);
