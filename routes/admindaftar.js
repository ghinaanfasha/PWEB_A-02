var express = require('express');
const { getUsers, listOfUsers } = require('../controllers/Users');
const { list } = require('postcss');
var router = express.Router();
const verifyUser = require('../middleware/VerifyToken');
const adminController = require('../controllers/admin')


/* GET adminhome. */
router.get('/', verifyUser('admin'),adminController.getListPendaftar);
router.post('/tolak/:id_user', verifyUser('admin'),adminController.tolakPendaftar);
router.post('/terima/:id_user', verifyUser('admin'),adminController.terimaPendaftar);


module.exports = router;