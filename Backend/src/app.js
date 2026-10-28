const express = require("express");
const { adminAuth } = require("./middleware/adminAuth");
const app = express();


app.use("/user", adminAuth);

app.post("/user/add", (req, res) => {
    try {
        res.status(200).send("Data Saved")
        console.log("Data Saved")
    }
    catch (err) {
        throw new Error("Error Thrown By Middleware ", { cause: err })
    }
})

// Wildcard error handler: executed only if any error is thrown or not handled anywhere
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send("Internal Server Error")
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});