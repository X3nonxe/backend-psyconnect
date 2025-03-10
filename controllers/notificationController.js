// /controllers/notificationController.js
const Notification = require('../models/Notification');
const { sendEmail } = require('../services/emailService');

// Membuat notifikasi baru
const createNotification = (req, res) => {
  const { id_user, message } = req.body;

  // Simpan notifikasi ke database
  Notification.create({ id_user, message }, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error creating notification' });
    }

    res.status(201).json({ message: 'Notification created successfully' });
  });
};

// Mengirim notifikasi email
const sendNotificationEmail = (req, res) => {
  const { email, subject, text } = req.body;

  sendEmail(email, subject, text);
  res.json({ message: 'Email sent successfully' });
};

// Mendapatkan notifikasi pengguna
const getUserNotifications = (req, res) => {
  const userId = req.params.userId;

  Notification.getByUser(userId, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching notifications' });
    }

    res.json({ notifications: results });
  });
};

// Menandai notifikasi sebagai dibaca
const markAsRead = (req, res) => {
  const notificationId = req.params.notificationId;

  Notification.markAsRead(notificationId, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error marking notification as read' });
    }

    res.json({ message: 'Notification marked as read' });
  });
};

module.exports = { createNotification, sendNotificationEmail, getUserNotifications, markAsRead };
