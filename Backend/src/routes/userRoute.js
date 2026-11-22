const express = require('express');
const { userAuth } = require('../middleware/authMiddleware');
const { ConnectionRequestModel } = require('../models/connectionRequest');
const userRouter = express.Router();

//getting all the connection which user got

userRouter.get("/", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        console.log(loggedInUser)
        const data = await ConnectionRequestModel.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", ["firstName", "lastName", "emailId", "gender", "age"])

        if (!data ||  data.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No Connection Found"
            })
        }
        
        res.status(200).json({
            success: true,
            message: "Connection Found",
            data: data
        })
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: `${err.message}`
        })
    }

})

module.exports = { userRouter };    