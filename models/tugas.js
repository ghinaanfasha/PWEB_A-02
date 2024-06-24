'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class tugas extends Model {
    static associate(models) {
      tugas.belongsTo(models.labor, { foreignKey: 'id_labor' });
      tugas.belongsToMany(models.user, { through: models.pengumpulan_tugas, foreignKey: 'id_user' });
    }
  }
  tugas.init({
    id_tugas: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_labor: {
      type: DataTypes.INTEGER,
      defaultValue: 1 // Set default value for id_labor
    },
    judul_tugas: DataTypes.STRING,
    keterangan: DataTypes.STRING,
    deadline: DataTypes.DATE,
    file_tugas: DataTypes.STRING,
    bobot_tugas: {
      type: DataTypes.FLOAT,
      defaultValue: 0 // Set default value for bobot_tugas
    }
  }, {
    sequelize,
    modelName: 'tugas',
    freezeTableName: true
  });
  return tugas;
};
