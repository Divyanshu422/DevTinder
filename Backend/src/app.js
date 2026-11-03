const express = require("express");
const { connectDatabase } = require("./config/database");
const bcrypt = require("bcrypt");
const app = express();
const { User } = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const cookieParser = require("cookie-parser");
const validator = require("validator");

// Middleware to parse the incoming request data from JSON format to java script object.
app.use(express.json());
// Middleware to parse the incoming request data from cookie.
app.use(cookieParser())

// =========================================================================
// 1. POST /signup - Validate -> Hash Password -> Save Sanitized User
// =========================================================================
app.post("/signup", async (req, res) => {
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
            // Sending the dummy cookie-token
            res.cookie("token", "Dummy_cookie_send_to_frontend")
            res.send("Login Successful!!!");
        } else {
            throw new Error("Invalid credentials");
        }
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});


app.get("/profile", (req, res) => {
    // Reading cookie
    try {
        console.log("Reading Cookie", req.cookies);
        res.send("Profile Api called")
    } catch (error) {
        res.status(400).send("ERROR : " + error.message);
    }
})

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
