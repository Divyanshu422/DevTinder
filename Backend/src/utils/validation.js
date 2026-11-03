
const validator = require("validator")

const validateSignUpData = (req) => {

    // Destructuring the req.body
    const { firstName, lastName, emailId, password } = req.body;

    // 1. Basic existence check
    if (!firstName || !lastName || !emailId || !password) {
        throw new Error("All field are required")
    }

    // 2. Validate email format using the validator library
    if (!validator.isEmail(emailId)) {
        throw new Error("Email is not valid!");
    }

    // 3. Validate strict password requirements using the validator library
    if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter a strong password!");
    }
}

module.exports = {
    validateSignUpData
}