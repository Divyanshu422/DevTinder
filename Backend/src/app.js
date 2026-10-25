const express = require("express");

const app = express();

// Request handler
app.use((req, res) => {
    console.log("Request received");
    res.send("Hello from the server");
});


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});