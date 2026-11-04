const { mongoose } = require("mongoose");
const validator = require("validator");

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
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("not a valid email")
      }
    }
  },
  password: {
    type: String,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("Not a valid password")
      }
    }
  },
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
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error("Not a valid url")
      }
    }
  },
  skills: {
    type: [String],
  },
}, { timestamps: true });

userSchema.method.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, HASH_KEY, {
    expiresIn: "7d",
  });
}




// Pascal case for class/model name - User
const User = mongoose.model("User", userSchema);

module.exports = { User };
