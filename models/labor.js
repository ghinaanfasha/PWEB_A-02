const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/Database.js");

const labor = db.define(
  "labor",
  {
    id_labor: {
      type: DataTypes.STRING,
    },
    nama_labor: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    contact_number: {
      type: DataTypes.STRING,
    },
    deskripsi_labor: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    refresh_token: {
      type: DataTypes.TEXT,
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

module.exports = labor
