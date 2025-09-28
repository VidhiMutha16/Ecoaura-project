const WasteLog = require('../models/wasteLogModel');

// @desc    Create a new waste log entry
// @route   POST /api/logs
const createWasteLog = async (req, res) => {
    const { eventId, wasteType, weight } = req.body;

    try {
        const log = new WasteLog({
            event: eventId,
            wasteType,
            weight,
            recordedBy: req.user._id, // The logged-in volunteer
        });

        const createdLog = await log.save();
        res.status(201).json(createdLog);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { createWasteLog };