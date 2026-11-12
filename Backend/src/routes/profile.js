const express = require("express");
const { userAuth } = require("../middleware/auth");

const profileRouter = express.Router();


// 3. PROTECTED API: Get Logged-In User's Profile (Secured by `userAuth` middleware)
profileRouter.get("/", userAuth, async (req, res) => {
    try {
        // `req.user` was already fetched and attached by `userAuth` middleware!
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

module.exports = { profileRouter }