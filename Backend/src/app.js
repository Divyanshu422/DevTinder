const express = require("express");

const app = express();


app.use("/", (req, res, next) => {
    const token = "Admin"
    const isAuthenticated = (token === "Admin")
    // Sending back the request if unauthorised from the middleware
    if (!isAuthenticated) {
        res.status(401).send("Not Authenticated")
    }
    next();
})

app.post("/user", (req, res) => {
    res.status(200).send("Data Saved")
    console.log("Data Saved")
})


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});