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

// ✅ 1. Using Query Params (GET http://localhost:7777/user?emailId=akshay@saini.com)
app.get("/user", async (req, res) => {
    const userEmail = req.query.emailId; // Read from URL query string, NOT req.body!

    try {
        const user = await User.findOne({ emailId: userEmail });
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.send(user);
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
});


// ✅ 2. Using Path Params (GET http://localhost:7777/user/66d5f8b2c9e77c001f8a1234)
app.get("/user/:userId", async (req, res) => {
    const userId = req.params.userId; // Read from dynamic URL path (:userId)

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.send(user);
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
});

// DELETE /user - Delete a user from the database by _id
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
        // Both `findByIdAndDelete(userId)` and `findByIdAndDelete({ _id: userId })` work!
        // Under the hood, it executes `findOneAndDelete({ _id: userId })`
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    } catch (err) {
        res.status(400).send("Something went wrong ");
    }
});


const PORT = 3000;

connectDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.log("Server Failed to runned", error);
})




