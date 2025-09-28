const express = require('express');
const router = express.Router();
const { getWasteComposition } = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');

router.get('/waste-composition/:eventId', protect, getWasteComposition);

module.exports = router;