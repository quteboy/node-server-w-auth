import { signUpController } from "../Controllers/Authentication/authentication.js";
import passport from "passport";
import { jwtLogin } from "../Services/passport.js";
const requireAuth = passport.authenticate("jwt", { session: false });
const router = (app) => {
  console.log('requireAuth',requireAuth)
  app.get("/", requireAuth, (req, res, next) => {
    ///
    res.send({ hi: "Kedo Hal ?" });
  });
  app.post("/signup", signUpController);
};

export { router };
