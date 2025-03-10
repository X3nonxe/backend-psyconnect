// /routes/scheduleRoutes.js
const express = require('express');
const { bookConsultation, getUserConsultations, getPsychologistConsultations, getAvailableConsultations } = require('../controllers/scheduleController');
const { userAuth } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/available/:id', userAuth, getAvailableConsultations);
router.get('/:userId/:roleId', userAuth, getUserConsultations);
router.get('/psychologist/:psychologistId', userAuth, getPsychologistConsultations);
router.post('/book', userAuth, bookConsultation);

module.exports = router;
