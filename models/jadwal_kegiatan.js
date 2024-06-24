'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class jadwal_kegiatan extends Model {
    static associate(models) {
      jadwal_kegiatan.hasMany(models.absen_kegiatan, {
        foreignKey: 'id_jadwal',
        as: 'absensi'
      });
    }
  }

  jadwal_kegiatan.init({
    id_jadwal: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    jadwal: {
      type: DataTypes.DATE,
      allowNull: false
    },
    keterangan: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'jadwal_kegiatan',
    tableName: 'jadwal_kegiatan',
    timestamps: false
  });

  return jadwal_kegiatan;
};
