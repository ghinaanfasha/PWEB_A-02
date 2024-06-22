var express = require('express');
var router = express.Router();

/* GET admindaftar. */
router.get('/', function(req, res, next) {
  res.render('adminschedule', { title: 'adminschedule' });
});

module.exports = router;