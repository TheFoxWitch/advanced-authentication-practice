import User from "../models/UserModel";

export function userExists {

User.findOne({ username:u}).exec()
.then((existingUser) => {
  // If the user exist return an error on sign up
  if (existingUser) {
    console.log("This username is already being used");
    return res.status(422).json({ error: "Username is in use" });
  }
  console.log("This username is free to use");
  saveUser(username,password,res,next);
})
.catch(err => next(err));

}
