const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next, roleCheck) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).json({ message: 'Token is required' });
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, 'secretkey', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    if (roleCheck && !roleCheck(decoded)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
