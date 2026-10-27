const express = require("express");

const app = express();


app.use("/", (req, res, next) => {
    const token = "Admin"
    const isAuthenticated = (token === "Admin")
    if (isAuthenticated) {
        console.log("app.use middleware is called")
        next();
    }
    else {
        res.status(401).send("Not Authenticated")
    }
})

app.post("/user", (req, res) => {
    res.status(200).send("Data Saved")
    console.log("Data Saved")
})


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});