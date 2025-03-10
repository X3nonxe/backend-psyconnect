// app.js
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
const SERVER = http.createServer(app);
const IO = socketIo(SERVER); // Menambahkan Socket.io ke server
const PORT = 3000;

// Menangani koneksi WebSocket
IO.on('connection', (socket) => {
  console.log('A user connected');

  // Event untuk menerima pesan
  socket.on('send-message', (data) => {
    console.log('Message received: ', data);
    // Emit pesan ke pengguna lainnya dalam chat room
    IO.to(data.roomId).emit('receive-message', data);
  });

  // Event untuk bergabung ke ruang chat tertentu
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`User joined room ${roomId}`);
  });

  // Event untuk memutuskan koneksi
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

app.use(bodyParser.json());
app.use(
  cors({
    origin: '*',
  })
);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/chat', chatRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
