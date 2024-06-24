var express = require('express');
var router = express.Router();
const tugasController = require('../controllers/tugasController');

router.get('/', tugasController.getPembobotanPage);
router.post('/update', tugasController.updatePembobotan);

module.exports = router;
