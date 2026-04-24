const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const users = [
    {
        name: 'Rajesh Kumar',
        email: 'farmer@agritrust.com',
        password: 'password123',
        role: 'Farmer',
        isVerified: true
    },
    {
        name: 'Priya Sharma',
        email: 'admin@agritrust.com',
        password: 'password123',
        role: 'Admin',
        isVerified: true
    },
    {
        name: 'Suresh Logistics',
        email: 'bob@logistic.com',
        password: 'password123',
        role: 'Distributor',
        isVerified: true
    }
];

const importData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        await User.deleteMany();
        
        await User.create(users);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
