const { mongoose } = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    emailId: {
        type: String,
    },
    password: String,
    age: {
        type: Number,
    },
    gender: {
        type: String,
    },
    role: {
        type: String,
    }
})

// Pascal case for class/model name - User
const User = mongoose.model("User", userSchema)

module.exports = { User }