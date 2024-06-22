const { DataTypes } = require("sequelize");
const db = require("../config/Database.js");

const Modul = db.define(
  "modul",
  {
    id_modul: {
      type: DataTypes.STRING,
    },
    judul_modul: {
      type: DataTypes.STRING,
    },
    keterangan: {
      type: DataTypes.TEXT,
    },
    modul: {
      type: DataTypes.STRING,
    },
    id_labor: {
      type: DataTypes.STRING,
    },
    // createdAt: {
    //   type: DataTypes.TIME,
    // },
    // updateAt: {
    //   type: DataTypes.TIME,
    // },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Modul;
