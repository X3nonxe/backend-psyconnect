// /models/Notification.js
const db = require('../config/db');

const Notification = {
  create: (notificationData, callback) => {
    const query = `INSERT INTO notifications (id_user, message) VALUES (?, ?)`;
    db.query(query, [notificationData.id_user, notificationData.message], callback);
  },
  getByUser: (userId, callback) => {
    const query = `SELECT * FROM notifications WHERE id_user = ? ORDER BY created_at DESC`;
    db.query(query, [userId], callback);
  },
  markAsRead: (notificationId, callback) => {
    const query = `UPDATE notifications SET is_read = true WHERE id_notification = ?`;
    db.query(query, [notificationId], callback);
  },
};

module.exports = Notification;
