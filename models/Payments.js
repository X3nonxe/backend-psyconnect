// /models/Payment.js
const db = require('../config/db');

const Payment = {
  create: (paymentData, callback) => {
    const query = `INSERT INTO payments (id_jadwal, id_user, amount, payment_status) VALUES (?, ?, ?, ?)`;
    db.query(query, [paymentData.id_jadwal, paymentData.id_user, paymentData.amount, paymentData.payment_status], callback);
  },
  updateStatus: (paymentId, status, callback) => {
    const query = `UPDATE payments SET payment_status = ? WHERE id_payment = ?`;
    db.query(query, [status, paymentId], callback);
  },
  getByUser: (userId, callback) => {
    const query = `SELECT * FROM payments WHERE id_user = ?`;
    db.query(query, [userId], callback);
  },
};

module.exports = Payment;
