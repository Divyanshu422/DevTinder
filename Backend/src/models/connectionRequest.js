const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId, // Tells Mongoose: "This will hold a MongoDB _id"
        required: true,
        ref: "User"
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
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

// Schema Pre-Save Hook: Runs automatically right before `.save()`
connectionRequestSchema.pre("save", function () {
    const connectionRequest = this;
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("Same user connection is not allowed!");
    }
})

// Compound Index on fromUserId + toUserId  
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 })

const ConnectionRequestModel = mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = {
    ConnectionRequestModel
}