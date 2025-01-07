import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const Schema = mongoose.Schema;

// define module

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true }, // unique check is for uniqueness for check and lowercase is for case-sensitive free
  password: String,
});
// on save button
// before saving run this model
userSchema.pre("save", function (next) {
  // get access to user model
  const user = this; /// user.email user.password

  // generate a salt then run callback
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }
    console.log("salt", salt);
    //hash (encrypt) password using salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }
      // override plainpassword with encrypted password
      console.log("hash", hash);
      user.password = hash;
      next();
    });
  });
});
// create a model class
const userModelClass = mongoose.model("user", userSchema);
// export model class
export { userModelClass };
