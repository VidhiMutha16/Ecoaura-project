const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Import all route files
const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes');
const eventRoutes = require('./routes/eventRoutes');
const wasteLogRoutes = require('./routes/wasteLogRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const adminRoutes = require('./routes/adminRoutes');
const vendorRoutes = require('./routes/vendorRoutes'); // <-- Import new routes

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Create the Express app instance
const app = express();

// Apply middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/logs', wasteLogRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/vendor', vendorRoutes); // <-- Use new routes

// Simple test route
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});