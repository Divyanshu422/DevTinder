const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId, // Tells Mongoose: "This will hold a MongoDB _id"
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },

    gender: {
        type: String,
        enum: ["male", "female", "others"], // Only these 3 strings are allowed
    },

    status: {
        type: String,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`, // Replaces {VALUE} with the bad input
        },
    }
}, {
    timestamps: true, // This automatically adds createdAt and updatedAt
});

const ConnectionRequestModel = mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = {
    ConnectionRequestModel
}