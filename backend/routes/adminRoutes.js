const express = require('express');
const router = express.Router();
const { getSystemStats, getAllUsers } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

// Protect all routes in this file first with 'protect', then with 'admin'
router.use(protect, admin);

router.get('/stats', getSystemStats);
router.get('/users', getAllUsers);

module.exports = router;