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
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return handleError(res, 404, 'User not found');
    }

    res.json({
      status: 'success',
      data: {
        id: user.id_user,
        name: user.nama,
        email: user.email,
        role_id: user.role_id,
      },
    });
  } catch (err) {
    return handleError(res, 500, 'Error retrieving profile', err);
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

module.exports = { getProfile, updateProfile, updatePassword, getAllUsers, getAllPsikolog, detailPsikolog };
