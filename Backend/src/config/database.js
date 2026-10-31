const mongoose = require('mongoose');

async function connectDatabase() {
    try {
        await mongoose.connect("mongodb+srv://divyanshu422_db_user:K6MUaRoPWqy6P0da@namastenode.sivasr9.mongodb.net/devTinder");
        console.log('Database connected successfully');
    } catch (err) {
        console.log('Error connecting to database', err);
    }
}


module.exports = { connectDatabase };