import User from "../models/UserModel";
import bcrypt from "bcrypt-nodejs";
import jwt from "jwt-simple";

export function signIn(req, res) {

  console.log("logged in now");
  res.json({ token: tokenForUser(req.user)});
}
export function signUp(req, res, next) {
  const { username, password } = req.body;
  //you don't need this in ES6, you can just reuse username below
  let u = username;
  // If no username or password was supplied return an error
  if (!username || !password) {
    return res.status(422)
      .json({ error: "You must provide an username and password" });
  }
  console.log("Look for a user with the username");
  //criteria object
  /*
  export default function userExists(req, res) {
    //what I'm trying to get as typed
    const u  = req.body.username;
    UserCheck.findOne({username: u}).exec().then((existingUser) => {
      // If the user exist return an error on sign up
      if (existingUser) {
        console.log("This username is already being used");
        return res.JSON.status(422).json({error: "Username is in use"});
      }
    }).catch(err => console.log(err.message));
  }

  */
  //what I'm trying to get as typed
  const usr  = req.body.username;
  User.findOne({ username:usr}).exec()
  .then((existingUser) => {
    // If the user exists return an error on sign up
    if (existingUser) {
      console.log("This username is already being used");
      return res.status(422)
        .json({ error: "Username is in use" });
    } else {
      return res.status(200)
        .json({ succees: "Okay to use" });
    }
    console.log("This username is free to use");
    saveUser(username,password,res,next);
  })
  .catch(err => next(err));
}
//this function is what is called in the
export function existingUser(req, res) {
  const usr  = req.body.username;
  User.findOne({ username:usr}).exec()
  .then((existingUser) => {
    // If the user exists return an error on sign up
    if (existingUser) {
      console.log("This username is already being used");
      return res.status(422)
        .json({ error: "Username is in use" });
    } else {
      return res.json({success: "Username is free to use!"});
    }
    console.log("This username is free to use");
  })
}
function saveUser(username,password,res,next) {
  // User bcrypt to has their password, remember, we never save plain text passwords!
  //adds a random value to a password if it's weak/too short
  bcrypt.genSalt(10, function (err, salt) {
    console.log("the salt",salt);
    bcrypt.hash(password, salt, null, function (err, hashedPassword) {
      if (err) {
        return next(err);
      }
      // Create a new user with the supplied username, and the hashed password
      const user = new User({ username, password: hashedPassword });
      console.log("Saving the user");
      user.save()
         .then(u => {
           console.log("User has been saved to database");
           res.json({ token: tokenForUser(u) });
         });
    });
  });
}
// encrypt the token for new user
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ userId: user.id, iat: timestamp }, process.env.SECRET);
}
