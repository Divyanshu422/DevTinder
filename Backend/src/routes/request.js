const express = require("express");
const { userAuth } = require("../middleware/authMiddleware");
const { ConnectionRequestModel } = require("../models/connectionRequest");
const connectionRequestRouter = express.Router();

connectionRequestRouter.post("/request/:userId", userAuth, async (req, res) => {
    try {
        // getting the formUserID: From userAuth
        const fromUserId = req.user._id;
        const toUserId = req.params.userId;
        // getting the status form request body 
        const { status } = req.body;
        // validating the payload status key - can either be interested and ignored
        const allowedStatus = ["interested", "ignored"]
        if (!allowedStatus.includes(status)) {
            // throw new Error(`Invalid Status send: ${status}`)
            throw new Error(JSON.stringify({
                message: "Invalid Status",
                status: status
            }))
        }

        // Saving the data in db 
        const conectionRequest = new ConnectionRequestModel({
            fromUserId: fromUserId,
            toUserId: toUserId,
            status: status
        })
        await conectionRequest.save();
        res.status(200).json({
            message: "Request sent successfully"
        });

    } catch (err) {
        // Earlier code: when we were directly throwing the error in line 16
        // res.status(400).json({
        //     message: err.message
        // })
        const errorData = JSON.parse(err.message);
        res.status(400).json({
            message: errorData.message,
            status: errorData.status
        })
    }
})


module.exports = { connectionRequestRouter };