const registerPsychologistSchema = require('../validations/registerPsychologistValidation');

const validateRegisterPsychologist = (req, res, next) => {
  const { error } = registerPsychologistSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = validateRegisterPsychologist;
