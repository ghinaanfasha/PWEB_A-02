const { Login } = require("../controllers/Users.js");
const Users = require("../models/UserModel.js");

var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/", Login)
  // res.send('Got a POST request

module.exports = router;
