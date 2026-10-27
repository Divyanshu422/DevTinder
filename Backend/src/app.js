const express = require("express");
const { adminAuth } = require("./middleware/adminAuth");
const app = express();


app.use("/user", adminAuth);

app.post("/user/add", (req, res) => {
    res.status(200).send("Data Saved")
    console.log("Data Saved")
})


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});