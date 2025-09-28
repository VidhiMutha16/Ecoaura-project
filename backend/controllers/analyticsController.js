
const mongoose = require('mongoose');
const WasteLog = require('../models/wasteLogModel');

// ... rest of the code from above
// @desc    Get waste composition for a specific event
// @route   GET /api/analytics/waste-composition/:eventId
const getWasteComposition = async (req, res) => {
    try {
        const stats = await WasteLog.aggregate([
            {
                $match: { event: new mongoose.Types.ObjectId(req.params.eventId) }
            },
            {
                $group: {
                    _id: '$wasteType', // Group by the wasteType field
                    totalWeight: { $sum: '$weight' } // Sum the weight for each group
                }
            }
        ]);

        // Format the data for a chart
        const chartData = {
            labels: stats.map(item => item._id),
            data: stats.map(item => item.totalWeight),
        };

        res.json(chartData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getWasteComposition };