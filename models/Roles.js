// /models/Role.js
const db = require('../config/db');

class Role {
  static findById(roleId, callback) {
    const query = 'SELECT * FROM role WHERE id_role = ?';
    db.query(query, [roleId], callback);
  }
}

module.exports = Role;
