var express = require('express');
var router = express.Router();
const auth = require("../controllers/Users.js")

/* GET home page. */

router.post("/logout" , auth.Logout)

// router.get('/adminhome', function(req, res, next) {
//   res.render('adminhome', { title: 'adminhome' });
// });



module.exports = router;
