const express = require('express');
const router = express.Router();
const { createWasteLog } = require('../controllers/wasteLogController');
const { protect } = require('../middleware/authMiddleware');

// All routes in this file are protected
router.use(protect);

// POST /api/logs
router.route('/').post(createWasteLog);

module.exports = router;