const Event = require('../models/eventModel');

// @desc    Get dashboard data for a logged-in vendor
// @route   GET /api/vendor/dashboard
// @access  Private/Vendor
const getVendorDashboardData = async (req, res) => {
    try {
        // Find events where the vendors array includes the current user's ID
        const events = await Event.find({ vendors: req.user._id });
        res.json({ events });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getVendorDashboardData };