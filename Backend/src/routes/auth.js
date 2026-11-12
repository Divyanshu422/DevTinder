const express = require('express');
const bcrypt = require("bcrypt");
const { User, validateSignUpData } = require("../models/user");
// authRouter handles all authentication related API calls  
const authRouter = express.Router();


// =========================================================================
// 1. POST /signup - Validate -> Hash Password -> Save Sanitized User
// =========================================================================
authRouter.post("/signup", async (req, res) => {
    try {
        // Step 1: Validation of data
        validateSignUpData(req);

        const { firstName, lastName, emailId, password } = req.body;

        // Step 2: Encrypt (Hash) the password with 10 salt rounds
        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash);

        // Step 3: Creating a new instance of the User model with explicit fields only
        // Any extra fields sent in `req.body` (e.g., `xyz`) are completely ignored!
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        });

        await user.save();
        res.send("User Added successfully!");
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

// =========================================================================
// 2. POST /login - Authenticate User with Email & bcrypt.compare()
// =========================================================================
authRouter.post("/login", async (req, res) => {
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

// =========================================================================
// 2. POST /logout - Removing the token
// Note: In production companies, developers often chain these two lines: 
// res.cookie("token", null, { expires: new Date(Date.now()) }).send("Logout Successful!!");
// =========================================================================

authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()), // Expires at the exact current millisecond!
    });
    res.send("Logout Successful!!");
});

module.exports = { authRouter };