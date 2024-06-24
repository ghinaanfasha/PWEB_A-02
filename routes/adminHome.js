var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('labor/adminHome', { title: 'Home' });
});

module.exports = router;
