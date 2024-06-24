'use strict';
const {
  Model
} = require('sequelize');
const Sequelize = require('sequelize'); 

module.exports = (sequelize, DataTypes) => {
  class labor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      labor.hasMany(models.jadwal_kegiatan, { foreignKey: 'id_labor' });
      labor.hasMany(models.modul, { foreignKey: 'id_labor' });
      labor.hasMany(models.tugas, { foreignKey: 'id_labor' });
      labor.belongsToMany(models.user, { through: models.pendaftar, foreignKey: 'id_labor' });
    }
  }
  labor.init({
    nama_labor: DataTypes.STRING,
    email: DataTypes.STRING,
    contact_number: DataTypes.STRING,
    deskripsi_labor: DataTypes.STRING,
    password: DataTypes.STRING,
    refresh_token: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'labor',
    freezeTableName: true
  });
  return labor;
};