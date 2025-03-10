// /routes/chatRoutes.js
const express = require('express');
const { createRoom, getMessages, sendMessage } = require('../controllers/chatController');
const { userAuth } = require('../middlewares/authMiddleware');

const router = express.Router();

// Endpoint untuk membuat ruang chat
router.post('/create-room', userAuth, createRoom);

// Endpoint untuk mengambil pesan dalam ruang chat
router.get('/:roomId/messages', userAuth, getMessages);

// Endpoint untuk mengirim pesan
router.post('/send-message', userAuth, sendMessage);

module.exports = router;
