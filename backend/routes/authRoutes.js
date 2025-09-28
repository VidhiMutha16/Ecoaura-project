const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();

// Route for /api/auth/register
router.post('/register', registerUser);

// Route for /api/auth/login
router.post('/login', loginUser);

module.exports = router;