const express = require('express');
const { userAuth } = require('../middleware/authMiddleware');
const { ConnectionRequestModel } = require('../models/connectionRequest');
const userRouter = express.Router();

//getting all the connection which user got

userRouter.get("/", userAuth, async (req, res) => {
    const loggedInUser = req.user;
    const data = await ConnectionRequestModel.find({
        fromUserId: loggedInUser._id,
        status: "interest"
    }).populate("fromUserId", ["firstName", "lastName", "emailId", "gender", "age"])

    if (!data) {
        return res.status(400).json({
            success: false,
            message: "No Connection Found"
        })
    }



})

module.exports = { userRouter };    