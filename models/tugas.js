const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/Database.js");

const tugas = db.define(
  "tugas",
  {
    id_tugas: {
      type: DataTypes.STRING,
    },
    id_labor: {
      type: DataTypes.STRING,
    },
    judul_tugas: {
      type: DataTypes.STRING,
    },
    keterangan: {
      type: DataTypes.TEXT,
    },
    deadline: {
        type: DataTypes.TIME,
      },
    file_tugas: {
        type: DataTypes.BLOB("medium"),
      },
    bobot_tugas: {
        type: DataTypes.INTEGER,
      },
    
  },
  {
    freezeTableName: true,
  }
);

module.exports = tugas;
