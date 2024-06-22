const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/Database.js");

const absen = db.define(
  "absen",
  {
    id_jadwal: {
      type: DataTypes.STRING,
    },
    id_user: {
      type: DataTypes.STRING,
    },
    keterangan: {
      type: DataTypes.TEXT,
    },
    kehadiran: {
        type: DataTypes.TINYINT,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = absen;
