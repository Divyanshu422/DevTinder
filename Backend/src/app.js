const express = require("express");
const { connectDatabase } = require("./config/database");
const app = express();

const PORT = 3000;

connectDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.log("Server Failed to runned", err);
})
