const db = require('../config/db');

const JadwalKonsultasi = {
  create: (data) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO jadwalKonsultasi (id_user, tanggal_konsultasi, id_waktu, id_status, id_psikolog) 
                     VALUES (?, ?, ?, ?, ?)`;
      db.query(query, [data.id_user, data.tanggal_konsultasi, data.id_waktu, data.id_status, data.id_psikolog], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  getByUser: (userId, roleId, callback) => {
    const query = `
      SELECT * FROM jadwalKonsultasi 
      WHERE id_user = ? AND role_id = ?
    `;
    const values = [userId, roleId];
    db.query(query, values, callback);
  },

  getByPsychologist: (psychologistId, callback) => {
    const query = `
      SELECT * FROM jadwalKonsultasi 
      WHERE id_psikolog = ?
    `;
    const values = [psychologistId];
    db.query(query, values, callback);
  },

  // Mengubah getAvailableConsultations menjadi Promise
  getAvailableConsultations: (psychologistId, callback) => {
    const query = `
      SELECT w.id_waktu_konsultasi, w.jam_mulai, w.jam_selesai, w.id_user
      FROM waktuKonsultasi w
      LEFT JOIN jadwalKonsultasi j ON w.id_waktu_konsultasi = j.id_waktu
      WHERE w.id_user = ? AND j.id_waktu IS NULL
    `;
    db.query(query, [psychologistId], (err, results) => {
      if (err) {
        return callback(err, null); // Pastikan error ditangani dengan baik
      }
      callback(null, results); // Panggil callback dengan hasil query
    });
  },

  getByPsychologistAndDate: (id_user, id_waktu, tanggal_konsultasi) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM jadwalKonsultasi
        WHERE id_user = ? AND id_waktu = ? AND tanggal_konsultasi = ?
      `;
      const values = [id_user, id_waktu, tanggal_konsultasi];
      db.query(query, values, (err, results) => {
        if (err) {
          console.error('Database error:', err); // Log error jika ada
          reject(err); // Menolak promise jika ada error
        } else {
          resolve(results); // Menyelesaikan promise dengan hasil query
        }
      });
    });
  },
};

module.exports = JadwalKonsultasi;
