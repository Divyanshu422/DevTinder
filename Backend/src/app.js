const express = require("express");

const app = express();


app.use("/user", (req, res, next) => {
    const token = "Admin"
    const isAuthenticated = (token === "Admin")
    // Sending back the request if unauthorised from the middleware
    if (!isAuthenticated) {
        res.status(401).send("Not Authenticated")
        // Hence function execution ends here only. if we placed next inside the else - if not used else block then it will goto next() anyhow - Error: Sending Headers once already send 
    }
    else {
        next();
    }
})

app.post("/user/add", (req, res) => {
    res.status(200).send("Data Saved")
    console.log("Data Saved")
})


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});