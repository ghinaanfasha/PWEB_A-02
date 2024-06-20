var express = require('express');
var router = express.Router();

/* GET admindaftar. */
router.get('/adminDaftar', function(req, res, next) {
  res.render('admindaftar', { title: 'admindaftar' });
});

module.exports = router;