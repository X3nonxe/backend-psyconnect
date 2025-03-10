// /routes/userRoutes.js
const express = require('express');
const { getProfile, updateProfile, updatePassword, getAllPsikolog, getAllUsers, detailPsikolog } = require('../controllers/userController');
const { userAuth } = require('../middlewares/authMiddleware'); // Middleware untuk memeriksa autentikasi

const router = express.Router();

router.get('/profile', userAuth, getProfile);
router.get('/all-psikolog', userAuth, getAllPsikolog);
router.get('/psikolog/:id', userAuth, detailPsikolog);
router.get('/all-users', userAuth, getAllUsers);
router.put('/profile', userAuth, updateProfile);
router.put('/update-password', userAuth, updatePassword);

module.exports = router;
