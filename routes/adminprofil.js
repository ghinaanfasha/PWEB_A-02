var express = require('express');
var router = express.Router();
const verifyUser = require('../middleware/VerifyToken');
const adminController = require('../controllers/admin')

/* GET adminprofile. */
router.get('/', verifyUser('admin'), function(req, res, next) {
  const id = req.userId; // Menggunakan userId dari req untuk mendapatkan ID pengguna
  console.log(id);
  res.render('adminprofil', { title: 'adminprofil' });
});

module.exports = router;
