const express = require("express");
const { connectDatabase } = require("./config/database");
const { bcrypt } = require("bcrypt");
const app = express();
const { User } = require("./models/user");
const { validateSignUpData } = require("./utils/validation");

// Middleware to parse the incoming request data from JSON format to java script object.
app.use(express.json());

// POST /signup - Adds a new user document to the 'users' collection
app.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const userInfo = req.body;

    const { firstName, lastName, emailId, password } = req.body;
    const hashedPassword = await bcrypt(password, 10);
    // Store user in database
    const newUser = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });
    // newUser.save() returns a Promise -> persists the document to MongoDB
    await newUser.save();
    res.json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.log("Error creating user:", error);
    res.json({ success: false, message: error.message });
  }
});

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
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      // Next Episode Preview: Create JWT token & attach it to an HTTP cookie here!
      res.send("Login Successful!!!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

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
