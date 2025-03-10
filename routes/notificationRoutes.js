// /routes/notificationRoutes.js
const express = require('express');
const { createNotification, sendNotificationEmail, getUserNotifications, markAsRead } = require('../controllers/notificationController');
const { userAuth } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create', userAuth, createNotification); // Membuat notifikasi baru
router.post('/send-email', userAuth, sendNotificationEmail); // Mengirim notifikasi email
router.get('/:userId', userAuth, getUserNotifications); // Mendapatkan notifikasi pengguna
router.put('/:notificationId/read', userAuth, markAsRead); // Menandai notifikasi sebagai dibaca

module.exports = router;
