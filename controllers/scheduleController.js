const JadwalKonsultasi = require('../models/JadwalKonsultasi');
const User = require('../models/User');

const bookConsultation = async (req, res) => {
  const { id_user, tanggal_konsultasi, id_waktu, id_status } = req.body;

  try {
    // Memeriksa apakah pengguna dengan id_user memiliki role_id 3 (klien)
    const user = await User.findRoleById(id_user); // Misalnya menggunakan metode getById pada model User
    if (!user || user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Lanjutkan pengecekan role_id atau operasi lainnya setelah ini
    if (user[0].role_id !== 3) {
      return res.status(400).json({ message: 'Only clients can book consultations' });
    }

    // Memeriksa apakah ada jadwal yang bertabrakan
    const existingSchedule = await JadwalKonsultasi.getByPsychologistAndDate(id_user, id_waktu, tanggal_konsultasi);

    if (existingSchedule.length > 0) {
      return res.status(400).json({ message: 'This time slot is already booked for this psychologist' });
    }

    // Cari psikolog yang tersedia (role_id = 2)
    const availablePsychologist = await User.findAvailablePsychologist();
    if (!availablePsychologist) {
      return res.status(400).json({ message: 'No available psychologists at this time' });
    }

    // Jika tidak ada tabrakan, lanjutkan untuk booking konsultasi
    const result = await JadwalKonsultasi.create({
      id_user,
      tanggal_konsultasi,
      id_waktu,
      id_status,
      id_psikolog: availablePsychologist.id_user,
    });

    // Filter informasi penting psikolog
    const psychologistInfo = {
      id_psikolog: availablePsychologist.id_user,
      nama: availablePsychologist.nama,
      nomor_telepon: availablePsychologist.nomor_telepon,
      jenis_kelamin: availablePsychologist.jenis_kelamin,
      foto: availablePsychologist.foto,
    };
    res.status(201).json({ message: 'Consultation booked successfully', psikolog: psychologistInfo });
  } catch (err) {
    console.error('Error booking consultation:', err); // Log error
    res.status(500).json({ message: 'Error booking consultation' });
  }
};

const getUserConsultations = async (req, res) => {
  const { userId, roleId } = req.params;

  try {
    const results = await JadwalKonsultasi.getByUser(userId, roleId);
    res.json({ consultations: results });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching consultations' });
  }
};

const getPsychologistConsultations = async (req, res) => {
  const { psychologistId } = req.params;

  try {
    const results = await JadwalKonsultasi.getByPsychologist(psychologistId);
    res.json({ consultations: results });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching consultations' });
  }
};

// Perbaikan getAvailableConsultations
const getAvailableConsultations = async (req, res) => {
  const psychologistId = req.params.id;

  try {
    const availableConsultations = await new Promise((resolve, reject) => {
      JadwalKonsultasi.getAvailableConsultations(psychologistId, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    if (!availableConsultations || availableConsultations.length === 0) {
      return res.status(404).json({ message: 'No available consultations for this psychologist' });
    }

    res.json({
      message: 'Available consultations fetched successfully',
      data: availableConsultations,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching available consultations' });
  }
};

module.exports = { bookConsultation, getUserConsultations, getPsychologistConsultations, getAvailableConsultations };
