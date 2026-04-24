const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Set security headers
app.use(helmet());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Routes placeholder
app.get('/', (req, res) => {
    res.json({ message: 'AgriTrust AI-Ledger API is running...' });
});

// Define Routes
app.use('/api/batches', require('./routes/batchRoutes'));
app.use('/api/tracking', require('./routes/trackingRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/admin', require('./routes/admin'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
