import { userModelClass } from "../../models/userModel.js";
import { secretKey } from "../../config.js";
import jwt from "jwt-simple";

function tokenForUser(user) {
  const timeStamp = new Date().getTime;
  return jwt.encode({ sub: user.id, iat: timeStamp }, secretKey);
}

const signUpController = (req, res, next) => {
  //
  const email = req.body.email;
  const password = req.body.password;
  // see if user exists in database
  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "Email and password can not be empty" });
  }

  userModelClass.findOne({ email: email }).then((err, existingUser) => {
    if (err) {
      return next(err);
    }
    //if user with email address exists in database return erro and give error message in response
    if (existingUser) {
      return res.status(422).send({ error: "Email is in use" });
    }
    // if user with email address does not exist create and save user record
    const user = new userModelClass({
      email: email,
      password: password,
    });
    user.save().then((err) => {
      if (err) {
        next(err);
      }
      res.json({ token: tokenForUser(user) });
    });
  });

  // report to request indicating new user has been created
};

export { signUpController };
