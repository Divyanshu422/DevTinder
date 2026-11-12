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
