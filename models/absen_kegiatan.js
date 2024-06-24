'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class absen_kegiatan extends Model {
    static associate(models) {
      // Define associations here
    }
  }

  absen_kegiatan.init({
    id_jadwal: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'jadwal_kegiatan',
        key: 'id_jadwal'
      }
    },
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id_user'
      }
    },
    kehadiran: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'absen_kegiatan',
    tableName: 'absen_kegiatan',
    timestamps: false
  });

  return absen_kegiatan;
};
