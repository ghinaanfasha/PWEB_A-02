'use strict';
const {
  Model
} = require('sequelize');
const Sequelize = require('sequelize'); 

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.belongsToMany(models.labor, { through: models.pendaftar, foreignKey: 'id_user' });
      user.belongsToMany(models.tugas, { through: models.pengumpulan_tugas, foreignKey: 'id_user' });
      user.belongsToMany(models.jadwal_kegiatan, { through: models.absen_kegiatan, foreignKey: 'id_user' });
      user.belongsToMany(models.jadwal_kegiatan, { through: models.pengajuan_wawancara, foreignKey: 'id_user' });
    }
  }
  user.init({
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    nim: DataTypes.STRING,
    contact_number: DataTypes.STRING,
    password: DataTypes.STRING,
    refresh_token: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'user',
    freezeTableName: true
  });
  return user;
};