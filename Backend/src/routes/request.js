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
        res.status(400).json({
            message: err.message
        })
    }
})


module.exports = { connectionRequestRouter };