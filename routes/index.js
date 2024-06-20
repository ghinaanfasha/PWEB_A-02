const { Login } = require("../controllers/Users.js");
const Users = require("../models/UserModel.js");

var express = require("express");
var router = express.Router();
const auth = require("../controllers/Users.js")

/* GET home page. */


router.post("/", Login)
  // res.send('Got a POST request

module.exports = router;
