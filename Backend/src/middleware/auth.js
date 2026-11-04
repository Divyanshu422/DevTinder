const jwt = require("jsonwebtoken");
const User = require("../models/user");

const HASH_KEY = "DevTinder@";
const userAuth = async (req, res, next) => {
  try {
    // 1. Read the token from the request cookies (parsed by cookie-parser)
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token is not valid!!!!");
    }

    // 2. Validate the token and decode the hidden payload ({ _id, iat, exp })
    const decodedObj = await jwt.verify(token, HASH_KEY);
    // extracting the id form the decoded token.
    const { _id } = decodedObj;

    // 3. Find the user in the database
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }

    // 4. Attach the found user object to the `req` object so route handlers don't re-query DB
    req.user = user;

    // 5. Call next() to move control to the main request handler
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = {
  userAuth,
};
