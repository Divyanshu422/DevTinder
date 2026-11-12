const express = require("express");
const { connectDatabase } = require("./config/database");
const app = express();
const { User } = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const cookieParser = require("cookie-parser");
const validator = require("validator");
const { userAuth } = require("./middleware/auth")

// Middleware to parse the incoming request data from JSON format to java script object.
app.use(express.json());
// Middleware to parse the incoming request data from cookie.
app.use(cookieParser());

const HASH_KEY = "DevTinder@";


// =========================================================================
// 2. POST /login - Authenticate User with Email & bcrypt.compare()
// =========================================================================
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // Optional Homework Check: Validate email format before querying DB
    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid credentials");
    }

    // Step 1: Check if a user with this emailId exists in the database
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      // Generic error message to prevent Information Leaking
      throw new Error("Invalid credentials");
    }

    // Step 2: Compare plain password from req.body with hashed password in DB
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT(); // Schema methods
      // Sending the token inside the cookie with expires time
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000), // Note: `expires` (Expires in 8 hours)
        // httpOnly: true // Security option so client-side JS cannot steal the cookie
      });
      res.send("Login Successful!!!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

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
