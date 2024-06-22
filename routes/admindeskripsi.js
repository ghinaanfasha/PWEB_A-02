var express = require('express');
var router = express.Router();
const verifyUser = require('../middleware/VerifyToken');
const adminController = require('../controllers/admin')

/* GET admindaftar. */
router.get('/', verifyUser('admin'), adminController.tampilAdminDeskripsi);
router.post('/', verifyUser('admin'), adminController.changeDeskripsi);


module.exports = router;