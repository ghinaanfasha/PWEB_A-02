'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class absen_kegiatan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  absen_kegiatan.init({
    id_jadwal: {
      type: Sequelize.INTEGER,
      references: {
        model: 'jadwal_kegiatan',
        key: 'id_jadwal'
      }
    },
    id_user: {
      type: Sequelize.INTEGER,
      references: {
        model: 'user',
        key: 'id_user'
      }
    },
    kehadiran: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'absen_kegiatan',
    freezeTableName: true
  });
  return absen_kegiatan;
};