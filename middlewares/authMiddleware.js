const verifyToken = require('../utils/verifyToken');

const adminAuth = (req, res, next) => {
  verifyToken(req, res, next, (decoded) => decoded.role_id === "1");
};

const userAuth = (req, res, next) => {
  verifyToken(req, res, next);
};

module.exports = { adminAuth, userAuth };
