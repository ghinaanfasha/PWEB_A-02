var express = require("express");
const Admin = require("../../models/admin");
// const { getModul, addModul } = require("../../controllers/ModulController");
var router = express.Router();
const multer = require("multer");
const { getModul, addModul } = require("../../controllers/modulcontroller");
const Jadwal = require("../../models/jadwal");
const { createMagangSchedule } = require("../../controllers/admin");

router.get("/", async function (req, res) {
  try {
    const adminData = await Admin.findAll({
      attributes: ["id_labor", "nama_labor", "deskripsi_labor"],
    });
    res.json(adminData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/modul", async function (req, res) {
  try {
    // Call the getModul function to fetch data
    const modules = await getModul(req, res);
    res.json(modules);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Upload Modul
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/modul/"); // specify the destination directory
  },
  filename: function (req, file, cb) {
    // Generate a unique filename
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        "." +
        file.originalname.split(".").pop()
    );
  },
});
const upload = multer({ storage: storage });

router.post(
  "/modul/upload",
  upload.single("upload_modul"),
  function (req, res) {
    try {
      addModul(req);
      console.log("req.file :>> ", req.file.filename);
      console.log("req.body :>> ", req.body);
      res.redirect("/adminmodul");
    } catch (error) {
      console.log("error on upload file: :>> ", error);
    }
  }
);

router.post(
  "/magang/create",
  async function (req, res) {
    try {
      createMagangSchedule(req, res)
    } catch (error) {
      console.log("error on upload file: :>> ", error);
    }
  }
);

module.exports = router;
