const express = require('express');
const { userAuth } = require('../middleware/authMiddleware');
const { ConnectionRequestModel } = require('../models/connectionRequest');
const userRouter = express.Router();

//getting all the connection which user got

userRouter.get("/me/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const data = await ConnectionRequestModel.find({
            toUserId: loggedInUser._id,
            status: req.query.status
        }).populate("fromUserId", ["firstName", "lastName", "emailId", "gender", "age"])

        if (!data || data.length === 0) {
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

userRouter.get("/me/connection", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const data = await ConnectionRequestModel.find({
            $or: [{
                toUserId: loggedInUser._id,
                status: accepted
            }, {
                fromUserId: loggedInUser._id,
                status: accepted
            }]
        })
            .populate("fromUserId", ["firstName", "lastName", "emailId", "gender", "age"])
            .populate("toUserId", ["firstName", "lastName", "emailId", "gender", "age"])

        if (!data || data.length === 0) {
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