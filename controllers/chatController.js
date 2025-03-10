// /controllers/chatController.js
const Chat = require('../models/Chat');

// Membuat ruang chat baru
const createRoom = (req, res) => {
  const { userId, roleId } = req.body;

  // Cek apakah ruang chat sudah ada
  Chat.getRoom(userId, roleId, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error checking chat room' });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'Chat room already exists' });
    }

    // Membuat ruang chat baru
    Chat.createRoom(userId, roleId, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error creating chat room' });
      }

      res.status(201).json({ message: 'Chat room created successfully' });
    });
  });
};

// Mendapatkan pesan dalam ruang chat
const getMessages = (req, res) => {
  const { roomId } = req.params;

  Chat.getMessages(roomId, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching messages' });
    }

    res.json({ messages: results });
  });
};

// Mengirim pesan dalam ruang chat dan menyimpannya ke database
const sendMessage = (req, res) => {
  const { roomId, senderId, message } = req.body;

  // Menyimpan pesan ke database
  Chat.sendMessage(roomId, senderId, message, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error sending message' });
    }

    // Emit pesan ke semua socket yang terhubung
    io.emit('new_message', { sender: senderId, message });

    res.json({ message: 'Message sent successfully' });
  });
};

module.exports = { createRoom, getMessages, sendMessage };
