const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Modul = require("../models/modul");
const { response } = require("express");

dotenv.config();

const getModul = async (req, res) => {
  try {
    const modules = await Modul.findAll({
      attributes: ["judul_modul", "keterangan", "modul"],
    });
    console.log("MODULES DATA: " + modules);
    res.json(modules);
  } catch (error) {
    console.log("Error on getModul: " + error);
  }
};

const addModul = async (req, res) => {
  try {
    await Modul.create(
      {
        judul_modul: req.body.judul_modul,
        keterangan: req.body.keterangan_modul,
        modul: req.file.filename,
      },
      { fields: ["judul_modul", "keterangan", "modul"] }
    )
      .then((result) => {
        console.log("result add modul :>> ", result);
        response.status(200)
      })
      .catch((err) => {
        console.log("error on add modul :>> ", err);
      });
  } catch (error) {
    console.log("Error on upload modul: :>> " + error);
  }
};

module.exports = {
  getModul,
  addModul,
};
