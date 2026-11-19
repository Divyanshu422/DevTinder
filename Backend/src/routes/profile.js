const express = require("express");
const { userAuth } = require("../middleware/auth");
const { validateEditProfileData } = require("../middleware/validation");
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

// 4. POST /update - Updating the profile
profileRouter.patch("/update", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req.body)) {
      throw new Error("Invalid Edit Data");
    }
    // loggedInUser = attached by userAuth
    const loggedInUser = req.user;
    // Updating the data - iterate over each key
    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });
    // Saving the data -
    await loggedInUser.save();
    res.status(200).json({
      message: `${loggedInUser.firstName}, your profile is updated successfully`,
      user: loggedInUser,
    });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = { profileRouter };
