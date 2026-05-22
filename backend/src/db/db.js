const mongoose = require("mongoose");

async function connectDB() {
    await mongoose.connect(process.env.MONGO_URI, {
        dbName: process.env.MONGO_DB_NAME || "posthub",
    });
    console.log(`connected to db: ${mongoose.connection.name}`);
    
}

module.exports = connectDB;