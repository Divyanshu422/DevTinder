const express = require("express");
const { connectDatabase } = require("./config/database");
const app = express();
const { User } = require("./models/user");

app.post("/signup", async (req, res) => {
    // Dummy data
    const userInfo = {
        firstName: "Divyanshu",
        lastName: "Tyagi",
        emailId: "devTinde3090@gmail.com",
        password: "Ayushi",
    }
    // Store user in database
    try {
        const newUser = new User(userInfo);
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
