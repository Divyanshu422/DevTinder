const express = require("express");
const { connectDatabase } = require("./config/database");
const cookieParser = require("cookie-parser");
const { authRouter } = require("./routes/auth");
const { profileRouter } = require("./routes/profile");

const app = express();
// Middleware to parse the incoming request data from JSON format to java script object.
app.use(express.json());
// Middleware to parse the incoming request data from cookie.
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/profile", profileRouter);

const PORT = 3000;

connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Server Failed to runned", error);
  });
