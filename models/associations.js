const User = require('./user');
const Pendaftar = require('./pendaftar');

// A User has many Pendaftar
User.belongsTo(Pendaftar, {
  foreignKey: 'id_user',
  sourceKey: 'id_user'
});

// A Pendaftar belongs to a User
Pendaftar.belongsTo(User, {
  foreignKey: 'id_user',
  targetKey: 'id_user',
});

module.exports = { User, Pendaftar };
