// /models/User.js
const db = require('../config/db');

const User = {
  create: (userData, callback) => {
    const query = `
      INSERT INTO user (
        id_user, nama, email, password, nomor_telepon, jenis_kelamin, foto, aktif, role_id, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [userData.id_user, userData.nama, userData.email, userData.password, userData.nomor_telepon, userData.jenis_kelamin, userData.foto, userData.aktif, userData.role_id, userData.created_at];
    db.query(query, values, callback);
  },

  findByEmail: (email, callback) => {
    const query = `SELECT * FROM user WHERE email = ?`;
    db.query(query, [email], callback);
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM user WHERE id_user = ?`;
      db.query(query, [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]); // Ambil data pertama dari array results
      });
    });
  },

  findRoleById: (id) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM user WHERE id_user = ?`;

      db.query(query, [id], (err, results) => {
        if (err) {
          return reject(err); // Menolak promise jika ada error
        }
        resolve(results); // Mengirimkan hasil query
      });
    });
  },

  updateUser: (userId, userData) => {
    return new Promise((resolve, reject) => {
      const allowedFields = ['nama', 'email', 'nomor_telepon', 'jenis_kelamin', 'foto', 'aktif', 'password'];
      const setClause = [];
      const values = [];

      allowedFields.forEach((field) => {
        if (userData.hasOwnProperty(field)) {
          setClause.push(`${field} = ?`);
          values.push(userData[field]);
        }
      });

      if (setClause.length === 0) {
        return reject(new Error('Tidak ada field yang valid untuk diupdate'));
      }

      values.push(userId);

      const query = `
        UPDATE user 
        SET ${setClause.join(', ')} 
        WHERE id_user = ?
        AND role_id = 2
      `;

      db.query(query, values, (err, result) => {
        if (err) return reject(err);

        // Cek apakah ada row yang terpengaruh
        if (result.affectedRows === 0) {
          return reject(new Error('Psikolog tidak ditemukan'));
        }

        // Ambil data terbaru
        db.query('SELECT * FROM user WHERE id_user = ?', [userId], (err, rows) => {
          if (err) return reject(err);
          resolve(rows[0]);
        });
      });
    });
  },
  deleteUser: (userId, callback) => {
    const query = `
      UPDATE user 
      SET aktif = '0' 
      WHERE id_user = ? 
      AND role_id = 2
    `;
    db.query(query, [userId], callback);
  },

  updatePassword: (userId, newPassword, callback) => {
    const query = `UPDATE user SET password = ? WHERE id_user = ?`;
    db.query(query, [newPassword, userId], callback);
  },

  findAllPsikolog: () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM user WHERE role_id = 2`;
      db.query(query, (err, results) => {
        if (err) {
          reject(err); // Reject promise jika terjadi error
        } else {
          resolve(results); // Kirim data jika query berhasil
        }
      });
    });
  },

  findDetailPsikolog: (id) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          u.id_user, 
          u.nama, 
          u.email, 
          u.nomor_telepon, 
          u.jenis_kelamin, 
          u.foto,
          j.tanggal_konsultasi, 
          DAYNAME(j.tanggal_konsultasi) AS hari,
          w.id_waktu_konsultasi, 
          w.jam_mulai, 
          w.jam_selesai
        FROM user u
        LEFT JOIN waktukonsultasi w ON u.id_user = w.id_user
        LEFT JOIN jadwalkonsultasi j ON w.id_waktu_konsultasi = j.id_waktu
        WHERE 
          u.id_user = ? 
          AND u.role_id = 2
          AND u.aktif = '1'  // Hanya psikolog aktif
      `;

      db.query(query, [id], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  },

  findAll: () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM user WHERE role_id = 3`;
      db.query(query, (err, results) => {
        if (err) {
          reject(err); // Reject promise jika terjadi error
        } else {
          resolve(results); // Kirim data jika query berhasil
        }
      });
    });
  },

  findAvailablePsychologist: () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM user WHERE role_id = 2 LIMIT 1`;
      db.query(query, [], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
        }
      });
    });
  },

  findAvailablePsychologist: () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM user WHERE role_id = 2 LIMIT 1`;
      db.query(query, [], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
        }
      });
    });
  },
};

module.exports = User;
