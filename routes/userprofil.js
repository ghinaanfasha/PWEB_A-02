var express = require('express');
var router = express.Router();

/* GET user-profil. */
router.get('/', function(req, res, next) {
  res.render('userprofil', { title: 'Profil' });
});

module.exports = router;