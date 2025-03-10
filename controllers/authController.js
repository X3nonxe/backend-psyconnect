const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Roles = require('../models/Roles');
const hashPassword = require('../utils/hashPassword');
const createUser = require('../utils/createUser');

const register = async (req, res) => {
  const roleId = 3;
  const { nama, email, password, nomor_telepon, jenis_kelamin, foto, aktif, role_id } = req.body;

  if (role_id !== roleId) {
    return res.status(403).json({ message: 'Access denied, only users with role_id 3 (klien) can register' });
  }

  try {
    const hashedPassword = await hashPassword(password);
    await createUser({ nama, email, password: hashedPassword, nomor_telepon, jenis_kelamin, foto, aktif, role_id: roleId });
    res.status(201).json({
      message: 'User registered successfully',
      data: { nama, email, nomor_telepon, jenis_kelamin, foto, aktif, role_id: roleId },
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const registerPsychologist = async (req, res) => {
  const roleId = 2;
  const { nama, email, password, nomor_telepon, jenis_kelamin, foto, aktif } = req.body;

  if (req.user.role_id !== 1) {
    return res.status(403).json({ message: 'Hanya admin yang dapat mendaftarkan psikolog.' });
  }

  try {
    const hashedPassword = await hashPassword(password);
    await createUser({ nama, email, password: hashedPassword, nomor_telepon, jenis_kelamin, foto, aktif, role_id: roleId });
    res.status(201).json({
      message: 'Psycholog registered successfully',
      data: { nama, email, nomor_telepon, jenis_kelamin, foto, aktif, role_id: roleId },
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ message: 'Email belum terdaftar' });
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (!isMatch) {
        return res.status(401).json({ message: 'Password salah' });
      }

      Roles.findById(user.role_id, (err, roleResults) => {
        if (err || roleResults.length === 0) {
          return res.status(500).json({ message: 'Error fetching role information' });
        }

        const roleName = roleResults[0].nama_role;
        const token = jwt.sign({ id: user.id_user, role_id: user.role_id, role_name: roleName }, 'secretkey', { expiresIn: '30d' });

        res.json({
          message: `Login berhasil sebagai ${roleName}`,
          data: { token, role_name: roleName, username: user.nama },
        });
      });
    });
  });
};

module.exports = { register, registerPsychologist, login };
