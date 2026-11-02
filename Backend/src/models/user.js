const { mongoose } = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: String,
    emailId: {
        type: String,
        required: true,
        unique: true
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
    },
    about: {
        type: String,
        default: "Default description of user"
    },
    photoUrl: {
        type: String,
        default: "https://hancockogundiyapartners.com/management/dummy-profile-pic-300x300/"
    },
    skills: {
        type: [String]
    }
})

// Pascal case for class/model name - User
const User = mongoose.model("User", userSchema)

module.exports = { User }