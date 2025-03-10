// /models/Chat.js
const db = require('../config/db');

const Chat = {
  // Membuat ruang chat baru
  createRoom: (userId, roleId, callback) => {
    const query = `INSERT INTO chat_rooms (id_user, role_id) VALUES (?, ?)`;
    db.query(query, [userId, roleId], callback);
  },

  // Mendapatkan ruang chat berdasarkan user dan role
  getRoom: (userId, roleId, callback) => {
    const query = `SELECT * FROM chat_rooms WHERE id_user = ? AND role_id = ?`;
    db.query(query, [userId, roleId], callback);
  },

  // Mendapatkan pesan berdasarkan roomId
  getMessages: (roomId, callback) => {
    const query = `SELECT * FROM messages WHERE id_room = ? ORDER BY timestamp ASC`;
    db.query(query, [roomId], callback);
  },

  // Mengirim pesan
  sendMessage: (roomId, senderId, message, callback) => {
    const query = `INSERT INTO messages (id_room, id_sender, message) VALUES (?, ?, ?)`;
    db.query(query, [roomId, senderId, message], callback);
  },
};

module.exports = Chat;
