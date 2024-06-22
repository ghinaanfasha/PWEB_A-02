const { where } = require("sequelize");
const Admin = require("../models/admin.js");
const { User, Pendaftar } = require("../models/associations.js");
const Wawancara = require("../models/wawancara.js");
const Jadwal = require("../models/jadwal.js");

const tampilAdminDeskripsi = async (req, res) => {
  try {
    const id = req.userId;
    console.log("ini lah id dari", id);
    const labor = await Admin.findOne({
      where: {
        id_labor: id,
      },
    });
    if (!labor) {
      return res.status(400).json({ msg: "data labor tidak ditemukan" });
    }
    res.render("deskripsiadmin", { labor, title: "admindeskripsi" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, message: "internal error" });
  }
};
const changeDeskripsi = async (req, res) => {
  try {
    const id = req.userId;
    const { deskripsi } = req.body;
    const labor = await Admin.findOne({
      where: {
        id_labor: id,
      },
    });
    if (!labor) {
      return res.status(400).json({ msg: "data labor tidak ditemukan" });
    }
    const newdesc = await labor.update({
      deskripsi_labor: deskripsi,
    });
    if (!newdesc) {
      return res.status(400).json({ msg: "deskripsi gagal diperbarui" });
    }
    return res.status(200).json({ msg: "deskripsi berhasil diperbarui" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "internal server error" });
  }
};

const getListPendaftar = async (req, res) => {
  try {
    console.log("op");
    const id = req.userId;
    const pendaftar = await Pendaftar.findAll({
      where: {
        id_labor: id,
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["first_name", "last_name", "nim"],
        },
      ],
    });
    const wawancara = await Wawancara.findAll({
      where: {
        id_user: id,
      },
      include: [
        {
          model: User,
          as: "user",
        },
      ],
    });
    console.log(pendaftar.user);
    console.log("wawancara :>> ", wawancara);
    res.render("admindaftar", {
      title: "admindaftar",
      pendaftar: pendaftar,
      wawancara: wawancara,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

const tolakPendaftar = async (req, res) => {
  try {
    const { id_user } = req.params;
    const findData = await Pendaftar.findOne({
      where: {
        id_user: id_user,
      },
    });
    if (!findData) {
      return res.status(400).json({
        msg: "data tidak ditemukan",
      });
    }
    const tolak = await findData.update({
      verifikasi: 2,
    });
    if (!tolak) {
      return res.status(400).json({
        msg: "data gagal ditolak",
      });
    }
    return res.status(200).json({
      msg: "User berhasil ditolak",
    });
  } catch (error) {
    console.error(error);
    return restart.status(500).json({ msg: "internal server error" });
  }
};

const terimaPendaftar = async (req, res) => {
  try {
    const { id_user } = req.params;
    const findData = await Pendaftar.findOne({
      where: {
        id_user: id_user,
      },
    });
    if (!findData) {
      return res.status(400).json({
        msg: "data tidak ditemukan",
      });
    }
    const tolak = await findData.update({
      verifikasi: 1,
    });
    if (!tolak) {
      return res.status(400).json({
        msg: "data gagal diterima",
      });
    }
    return res.status(200).json({
      msg: "User berhasil diterima",
    });
  } catch (error) {
    console.error(error);
    return restart.status(500).json({ msg: "internal server error" });
  }
};

const createMagangSchedule = async (req, res) => {
  try {
    const createData = await Jadwal.create(
      {
        tanggal: req.body.tanggal_mulai,
        tanggal_akhir: req.body.tanggal_akhir,
        waktu: req.body.waktu,
      },
      // {
      //   fields: ["tanggal", "tanggal_akhir", "waktu"],
      // }
    );

    if (createData) {
      return res.status(200).json({
        msg: "Jadwal berhasil dibuat!",
      });
    } else {
      return res.status(400).json({
        msg: "gagal",
      });
    }
  } catch (error) {
    console.log("error on create magang schedule :>> ", error);
  }
};

module.exports = {
  tampilAdminDeskripsi,
  changeDeskripsi,
  getListPendaftar,
  tolakPendaftar,
  terimaPendaftar,
  createMagangSchedule,
};
