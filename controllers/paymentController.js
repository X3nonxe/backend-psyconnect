// /controllers/paymentController.js
const Payment = require('../models/Payments');

// Membuat pembayaran baru
const createPayment = (req, res) => {
  const { id_jadwal, id_user, amount } = req.body;

  Payment.create(
    {
      id_jadwal,
      id_user,
      amount,
      payment_status: 'pending',
    },
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error creating payment', error: err });
      }

      res.status(201).json({ message: 'Payment created successfully', paymentId: result.insertId });
    }
  );
};

// Memperbarui status pembayaran
const updatePaymentStatus = (req, res) => {
  const { id_payment, payment_status } = req.body;

  Payment.updateStatus(id_payment, payment_status, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating payment status' });
    }

    res.json({ message: 'Payment status updated successfully' });
  });
};

// Mendapatkan riwayat pembayaran pengguna
const getUserPayments = (req, res) => {
  const userId = req.params.userId;

  Payment.getByUser(userId, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching payments' });
    }

    res.json({ payments: results });
  });
};

module.exports = { createPayment, updatePaymentStatus, getUserPayments };
