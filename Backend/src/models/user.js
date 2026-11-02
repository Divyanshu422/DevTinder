const { mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    mimLength: 4,
    maxLength: 20,
  },
  lastName: {
    type: String,
    trim: true,
    mimLength: 4,
    maxLength: 20,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: String,
  age: {
    type: Number,
    min: 18,
    max: 60,
  },
  gender: {
    type: String,
    validate: (value) => {
      const gender = value.toLowerCase();
      if (!["male", "female", "others"].includes(gender)) {
        throw new Error("Invalid gender value");
      }
      return true;
    },
  },
  role: {
    type: String,
  },
  about: {
    type: String,
    default: "Default description of user",
  },
  photoUrl: {
    type: String,
    default:
      "https://hancockogundiyapartners.com/management/dummy-profile-pic-300x300/",
  },
  skills: {
    type: [String],
  },
}, {
  timeStamps: true
});

// Pascal case for class/model name - User
const User = mongoose.model("User", userSchema);

module.exports = { User };
