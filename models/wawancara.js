const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/Database.js");
const user = require("./user.js");

const Wawancara = db.define(
  "wawancara",
  {
    id_jadwal: {
      type: DataTypes.STRING,
    },
    id_user: {
      type: DataTypes.STRING,
    },
    pengajuan_tgl: {
      type: DataTypes.DATE,
    },
    pengajuan_waktu: {
      type: DataTypes.TIME,
    },
    persetujuan: {
      type: DataTypes.TINYINT,
    },
   
  },
  {
    freezeTableName: true,
  }
);

Wawancara.belongsTo(user, { foreignKey: 'id_user', as: 'user' });
user.hasMany(Wawancara, { foreignKey: 'id_user', as: 'wawancara' });

module.exports = Wawancara;
