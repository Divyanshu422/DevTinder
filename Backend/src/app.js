const express = require("express");
const { connectDatabase } = require("./config/database");
const app = express();
const { User } = require("./models/user");

// POST /signup - Adds a new user document to the 'users' collection
app.post("/signup", async (req, res) => {
    // Creating a new instance of the User model with dummy data
    // (In the next lecture, we will make this dynamic using req.body!)
    const userInfo = {
        firstName: "Divyanshu",
        lastName: "Tyagi",
        emailId: "devTinde3090@gmail.com",
        password: "Ayushi",
    }
    // Store user in database
    try {
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




