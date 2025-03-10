// /routes/paymentRoutes.js
const express = require('express');
const { createPayment, updatePaymentStatus, getUserPayments } = require('../controllers/paymentController');
const { userAuth } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create', userAuth, createPayment); // Membuat pembayaran baru
router.put('/update-status', userAuth, updatePaymentStatus); // Memperbarui status pembayaran
router.get('/:userId', userAuth, getUserPayments); // Mendapatkan riwayat pembayaran pengguna

module.exports = router;
