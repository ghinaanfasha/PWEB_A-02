var express = require('express');
var router = express.Router();

/* GET userhome. */
router.get('/', function(req, res, next) {
    try {
        res.render('adminmagang', { title: 'adminmagang' });
    } catch (error) {
        console.log(error)
    }
  
});

module.exports = router;