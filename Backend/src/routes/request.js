const express = require("express");
const { userAuth } = require("../middleware/authMiddleware");
const { ConnectionRequestModel } = require("../models/connectionRequest");
const connectionRequestRouter = express.Router();
const { User } = require("../models/user")

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
            throw new Error(`Invalid Status send: ${status}`)
        }

        // checking whether the toUserId is valid or not [ Meaning there is a person in db]
        const validToUserId = await User.findById(toUserId);
        if (!validToUserId) {
            throw new Error("Invalid User")
        }

        // Checking whether the connection already exist
        const existingConnectionRequest = await ConnectionRequestModel.findOne({
            $or: [
                { fromUserId, toUserId },                         // Check if A -> B exists
                { fromUserId: toUserId, toUserId: fromUserId },   // Check if B -> A exists
            ],
        });
        if (existingConnectionRequest) {
            res.status(400).json({ message: "Connection request already exist" })
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
        res.status(400).json({
            message: err.message
        })
    }
})

connectionRequestRouter.post("/review/:requestId", userAuth, async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const requestId = req.params.requestId;
        const { status } = req.body;

        // checking the status is valid or not [ Meaning there is a accepted or rejected ]
        const allowedStatus = ["accepted", "rejected"];
        if (!allowedStatus.includes(status)) {
            throw new Error(`Invalid Status: ${status}`)
        }

        // 2. Find the pending ("interested") connection request meant for the logged-in user
        const connectionRequest = await ConnectionRequestModel.findOne({
            _id: requestId,
            toUserId: loggedInUserId,
            status: "interested",
        });
        if (!connectionRequest) {
            return res.status(404).json({ message: "Connection request not found" });
        }

        // changing the status of db with the status received in body
        connectionRequest.status = status;
        await ConnectionRequest.save();

        res.status(200).json({
            message: `Connection request ${status} successfully`,
            data,
        });

    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

module.exports = { connectionRequestRouter };