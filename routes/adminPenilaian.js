var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('labor/adminPenilaian', { title: 'Penilaian' });
});

module.exports = router;
