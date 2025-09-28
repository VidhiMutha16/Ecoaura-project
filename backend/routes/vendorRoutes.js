const express = require('express');
const router = express.Router();
const { getVendorDashboardData } = require('../controllers/vendorController');
const { protect, vendor } = require('../middleware/authMiddleware');

// Protect all routes in this file
router.use(protect, vendor);

router.get('/dashboard', getVendorDashboardData);

module.exports = router;