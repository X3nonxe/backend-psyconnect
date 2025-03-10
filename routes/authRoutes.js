// /routes/authRoutes.js
const express = require('express');
const { register, registerPsychologist, login } = require('../controllers/authController');
const { adminAuth } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/register-psychologist', adminAuth, registerPsychologist);
router.post('/login', login);

module.exports = router;
