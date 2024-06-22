const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/Database.js");

const Jadwal = db.define(
  "jadwal",
  {
    id_jadwal: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    tanggal: {
      type: DataTypes.DATE,
    },
    tanggal_akhir: {
      type: DataTypes.DATE,
    },
    waktu: {
      type: DataTypes.TIME,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Jadwal;
