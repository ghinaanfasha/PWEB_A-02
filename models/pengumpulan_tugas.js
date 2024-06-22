const { Sequelize, DataTypes, BLOB } = require("sequelize");
const db = require("../config/Database.js");

const pengumpulan_tugas= db.define(
  "pengumpulan_tugas",
  {
    id_user: {
      type: DataTypes.STRING,
    },
    id_tugas: {
        type: DataTypes.INTEGER,
    },
    file_tugas: {
    type: DataTypes.BLOB("medium"),
    },
    waktu_pengumpulan: {
      type: DataTypes.TIME,
    },
    nilai: {
      type: DataTypes.INTEGER,
    },
    
  },
  {
    freezeTableName: true,
  }
);

module.exports = pengumpulan_tugas;
