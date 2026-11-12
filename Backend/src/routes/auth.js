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

authRouter.post('/login');
authRouter.post('/logout');

module.exports = authRouter;