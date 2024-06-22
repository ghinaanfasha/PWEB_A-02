const { DataTypes } = require("sequelize");
const db = require("../config/Database.js");

const pendaftar = db.define(
  "pendaftar",
  {
    id_user: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    id_labor: {
      type: DataTypes.STRING,
    },
    alasan_bergabung: {
      type: DataTypes.TEXT,
    },
    cv: {
      type: DataTypes.BLOB("medium"),
    },
    surat_komitmen: {
      type: DataTypes.BLOB("medium"),
    },
    verifikasi: {
      type: DataTypes.TINYINT,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = pendaftar;
