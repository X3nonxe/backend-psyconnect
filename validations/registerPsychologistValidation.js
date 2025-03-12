const Joi = require('joi');

const registerPsychologistSchema = Joi.object({
  nama: Joi.string().required().messages({
    'string.empty': 'Nama wajib diisi.',
    'any.required': 'Nama wajib diisi.',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email tidak valid.',
    'any.required': 'Email wajib diisi.',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password minimal 6 karakter.',
    'any.required': 'Password wajib diisi.',
  }),
  nomor_telepon: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required()
    .messages({
      'string.pattern.base': 'Nomor telepon harus terdiri dari 10 hingga 15 digit.',
      'any.required': 'Nomor telepon wajib diisi.',
    }),
  jenis_kelamin: Joi.string().valid('L', 'P').required().messages({
    'any.only': 'Jenis kelamin tidak valid. Gunakan "L" atau "P".',
    'any.required': 'Jenis kelamin wajib diisi.',
  }),
  foto: Joi.string().required(),
  aktif: Joi.string().required(),
});

module.exports = registerPsychologistSchema;
