const User = require('../models/User');

const createUser = (userData) => {
  return new Promise((resolve, reject) => {
    User.create(userData, (err, result) => {
      if (err) {
        reject(err); // Kirim error kembali ke controller
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = createUser;
