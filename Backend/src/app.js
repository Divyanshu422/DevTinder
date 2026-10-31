const express = require("express");
const { connectDatabase } = require("./config/database");
const app = express();
const { User } = require("./models/user");

// Middleware to parse the incoming request data from JSON format to java script object. 
app.use(express.json());

// POST /signup - Adds a new user document to the 'users' collection
app.post("/signup", async (req, res) => {
    try {
        const userInfo = req.body;
        // Store user in database
        const newUser = new User(userInfo);
        // newUser.save() returns a Promise -> persists the document to MongoDB
        await newUser.save();
        res.json({ success: true, message: "User created successfully" });
    } catch (error) {
        console.log("Error creating user:", error);
        res.json({ success: false, message: "Error creating user" });
    }

})

const PORT = 3000;

connectDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.log("Server Failed to runned", error);
})




