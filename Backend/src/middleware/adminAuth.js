const adminAuth = (req, res, next) => {
    console.log("Admin middleware is called from adminAuth file")
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
}

module.exports = { adminAuth }