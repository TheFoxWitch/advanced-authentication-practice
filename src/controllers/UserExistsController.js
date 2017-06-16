import User from "../models/UserModel";
import UserCheck from "../models/UserCheckModel";


export default function userExists(req, res) {
  //what I'm trying to get as typed
  const u  = req.body.username;
  UserCheck.findOne({username: u}).exec().then((existingUser) => {
    // If the user exist return an error on sign up
    if (existingUser) {
      console.log("This username is already being used");
      return res.status(422).json({error: "Username is in use"});
    }
  }).catch(err => console.log(err.message));
}
