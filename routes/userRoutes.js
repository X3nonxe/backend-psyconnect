// /routes/userRoutes.js
const express = require('express');
const { getProfile, updateProfile, updatePassword, getAllPsikolog, getAllUsers, detailPsikolog, updatePsikolog, deletePsikolog } = require('../controllers/userController');
const { userAuth } = require('../middlewares/authMiddleware');
const { adminAuth } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/profile/:id', userAuth, getProfile);
router.get('/all-psikolog', userAuth, getAllPsikolog);
router.get('/psikolog/:id', userAuth, detailPsikolog);
router.get('/all-users', userAuth, getAllUsers);
router.put('/profile', userAuth, updateProfile);
router.put('/update-password', userAuth, updatePassword);

router.put('/psikologs/:id', adminAuth, updatePsikolog);
router.delete('/psikologs/:id', adminAuth, deletePsikolog);

module.exports = router;
