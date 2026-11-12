const express = require("express");
const { connectDatabase } = require("./config/database");
const { User } = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const cookieParser = require("cookie-parser");
const validator = require("validator");
const { userAuth } = require("./middleware/auth")

const app = express();
// Middleware to parse the incoming request data from JSON format to java script object.
app.use(express.json());
// Middleware to parse the incoming request data from cookie.
app.use(cookieParser());

const HASH_KEY = "DevTinder@";



// 3. PROTECTED API: Get Logged-In User's Profile (Secured by `userAuth` middleware)
app.get("/profile", userAuth, async (req, res) => {
  try {
    // `req.user` was already fetched and attached by `userAuth` middleware!
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }

  const PORT = 3000;

  connectDatabase()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.log("Server Failed to runned", error);
    });
