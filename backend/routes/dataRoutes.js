const express = require('express');
const router = express.Router();
const { getOrganizerStats } = require('../controllers/dataController');
const { protect } = require('../middleware/authMiddleware');

// GET /api/data/organizer-stats
// This route is protected. Only logged-in users can access it.
router.get('/organizer-stats', protect, getOrganizerStats);

module.exports = router;