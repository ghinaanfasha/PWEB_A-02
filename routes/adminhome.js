var express = require('express');
const { getUsers, listOfUsers } = require('../controllers/Users');
const { list } = require('postcss');
var router = express.Router();
// const admin = require("../controllers/Users.js")
// const verifyToken = require("../middleware/VerifyToken.js")


/* GET adminhome. */
router.get('/', async function(req, res) {
  try {
    const users = await listOfUsers(); // Fetch the user data
    console.log('users :>> ', users); // Log the fetched data
    res.render('adminhome', { title: 'adminhome', userData: users });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;