// dotenv allows us to declare environment variables in a .env file, \
// find out more here https://github.com/motdotla/dotenv
require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import passport from "passport";
import authenticationRoutes from "./routes/AuthenticationRoutes";
import UserExistsRoutes from "./routes/UserExistsRoutes";

mongoose.set("debug", true);
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/authentication-practice");

const app = express();
//no autentication check per default
app.use(bodyParser.json());
app.use(authenticationRoutes);

// //middleware:
// app.use(function authChecker(req, res, next) {
//   // implement some logic to determine if you should allow this request
//   if (true) {
//       next();
//   } else {
//       res.send("Secured");
//   }
// });

app.get("/api/anyonecanseethis", function (req, res) {
  res.send("Hooray, I am not secured. Anyone can get this data");
});

app.use(UserExistsRoutes);

//boilerplate for authentication/what you want secured goes below this
const authStrategy = passport.authenticate("authStrategy", { session: false });
app.use(authStrategy);

app.get("/api/canigetthis", function (req, res) {
  res.send("You got the data. You are authenticated");
});
app.get("/api/secret", function (req, res) {
  res.send(`The current user is ${req.user.username}`);
});

app.get("/api/secured1", function (req, res) {
  res.send("Pretty secure");
});

app.get("/api/secured2", function (req, res) {
  res.send("Still secure buddy");
});

app.get("/api/secured3", function (req, res) {
  res.send("Secure for sure");
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening on port:${port}`);
});
