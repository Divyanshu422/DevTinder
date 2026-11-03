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
