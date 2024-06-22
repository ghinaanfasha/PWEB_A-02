const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/Database.js");

const admin = db.define(
  "admin",
  {
    id_labor: {
      type: DataTypes.STRING,
      primaryKey: true,
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
      type: DataTypes.TEXT,
    },
    password: {
      type: DataTypes.STRING,
    },
    access_token: {
      type: DataTypes.TEXT,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = admin;
