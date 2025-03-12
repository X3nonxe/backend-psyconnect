// /controllers/userController.js
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { handleError } = require('../utils/handleError');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    const response = users.map((user) => ({
      nama: user.nama,
      email: user.email,
      nomor_telepon: user.nomor_telepon,
      jenis_kelamin: user.jenis_kelamin,
      foto: user.foto,
      created_at: user.created_at,
    }));
    res.json({
      status: 'success',
      data: response,
    });
  } catch (err) {
    console.error(err);
    handleError(res, 500, 'Error retrieving users', err);
  }
};

const getAllPsikolog = async (req, res) => {
  try {
    const users = await User.findAllPsikolog();
    const response = users.map((user) => ({
      id: user.id_user,
      nama: user.nama,
      email: user.email,
      nomor_telepon: user.nomor_telepon,
      jenis_kelamin: user.jenis_kelamin,
      foto: user.foto,
      created_at: user.created_at,
    }));
    res.json({
      status: 'success',
      data: response,
    });
  } catch (err) {
    console.error(err);
    handleError(res, 500, 'Error retrieving users', err);
  }
};

const detailPsikolog = async (req, res) => {
  try {
    const psikologId = req.params.id;
    const psikolog = await User.findDetailPsikolog(psikologId);

    if (!psikolog) {
      return res.status(404).json({ message: 'Psikolog tidak ditemukan' });
    }

    res.json({
      status: 'success',
      data: psikolog,
    });
  } catch (err) {
    console.error(err);
    handleError(res, 500, 'Error retrieving psikolog details', err);
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User tidak ditemukan',
      });
    }

    res.json({
      status: 'success',
      data: {
        id: user.id_user,
        name: user.nama,
        email: user.email,
        role_id: user.role_id,
        created_at: user.created_at,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan server',
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { nama, email } = req.body;

    await User.updateUser(userId, { nama, email });
    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    handleError(res, 500, 'Error updating profile', err);
  }
};

const updatePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return handleError(res, 404, 'User not found');
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return handleError(res, 401, 'Old password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updatePassword(userId, hashedPassword);
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    handleError(res, 500, 'Error updating password', err);
  }
};

const updatePsikolog = async (req, res) => {
  try {
    const psikologId = req.params.id;
    const { nama, email, password, nomor_telepon, jenis_kelamin, foto, aktif } = req.body;

    const updateData = {
      nama,
      email,
      nomor_telepon,
      jenis_kelamin: jenis_kelamin.toUpperCase(),
      foto,
      aktif,
    };

    // Validasi jenis kelamin
    if (!['P', 'L'].includes(updateData.jenis_kelamin)) {
      return res.status(400).json({
        status: 'error',
        message: 'Jenis kelamin harus P atau L',
      });
    }

    // Handle password
    if (password) {
      if (password.length < 8) {
        return res.status(400).json({
          status: 'error',
          message: 'Password minimal 8 karakter',
        });
      }
      updateData.password = await bcrypt.hash(password, 10);
    }

    // Eksekusi update
    const updatedPsikolog = await User.updateUser(psikologId, updateData);

    res.json({
      status: 'success',
      message: 'Psikolog berhasil diupdate',
      data: {
        nama: updatedPsikolog.nama,
        email: updatedPsikolog.email,
        nomor_telepon: updatedPsikolog.nomor_telepon,
        jenis_kelamin: updatedPsikolog.jenis_kelamin,
        foto: updatedPsikolog.foto,
        aktif: updatedPsikolog.aktif,
        updated_at: updatedPsikolog.updated_at,
      },
    });
  } catch (err) {
    console.error('Update error:', err);

    const statusCode = err.message === 'Psikolog tidak ditemukan' ? 404 : 500;
    const message = err.message === 'Psikolog tidak ditemukan' ? err.message : 'Gagal mengupdate psikolog';

    res.status(statusCode).json({
      status: 'error',
      message: message,
      error: process.env.NODE_ENV === 'development' ? err : null,
    });
  }
};

const deletePsikolog = async (req, res) => {
  try {
    const psikologId = req.params.id;

    const result = await User.deleteUser(psikologId, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          status: 'error',
          message: 'Error deleting psikolog',
        });
      }

      if (!result.affectedRows) {
        return res.status(404).json({
          status: 'error',
          message: 'Psikolog tidak ditemukan',
        });
      }

      res.json({
        status: 'success',
        message: 'Psikolog berhasil dihapus',
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan server',
    });
  }
};

module.exports = { getProfile, updateProfile, updatePassword, getAllUsers, getAllPsikolog, detailPsikolog, updatePsikolog, deletePsikolog };
