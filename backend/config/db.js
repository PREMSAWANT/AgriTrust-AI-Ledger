const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000,
        });
        console.log(`🍀 MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        console.log('💡 TIP: Check if your current IP is whitelisted in MongoDB Atlas (Network Access).');
        // Don't exit process in development to allow for env hot-reloads
        if (process.env.NODE_ENV === 'production') process.exit(1);
    }
};

module.exports = connectDB;
