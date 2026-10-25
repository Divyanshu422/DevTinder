const express = require("express");

const app = express();

// Request handler for /test route
app.use("/test", (req, res) => {
    console.log("Test request received");
    res.send("Hello from the test route");
});


// Request handler for all request
app.use((req, res) => {
    console.log("Request received");
    res.send("Hello from the server");
});


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});