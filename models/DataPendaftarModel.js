const { Sequelize, DataTypes, BLOB } = require("sequelize");
const db = require("../config/Database.js");

const DataPendaftarModel = db.define("data_pendaftar", {
  nama: {
    type: DataTypes.STRING,
  },
  nim: {
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

  // freezeTableName: false,
});

module.exports = DataPendaftarModel;
