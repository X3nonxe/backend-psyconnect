const bcrypt = require('bcrypt');

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) reject('Error hashing password');
      resolve(hashedPassword);
    });
  });
};

module.exports = hashPassword;
