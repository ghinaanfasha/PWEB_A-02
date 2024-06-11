var express = require('express');
var router = express.Router();
const connection = require('../config/Database'); 

/* GET user-profil. */
router.get('/', function(req, res, next) {
  res.render('userprofil', { title: 'Profil' });
});

// API endpoint untuk mengambil data userprofil
router.get('/api/userprofil', (req, res) => {
  const query = 'SELECT * FROM userprofil';
  connection.query(query, (err, results) => {
      if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'Internal server error' });
          return;
      }
      res.json(results);
  });
});

router.get('/userprofil', function(req, res, next) {
  // Ambil email dari session
  var email = req.session.email;

  // Ambil bagian sebelum @ dari email untuk dijadikan username
  var username = email.split('@')[0];

  // Query ke database untuk mendapatkan data user
  connection.query('SELECT * FROM users WHERE email = ?', [email], function(err, results) {
    if (err) throw err;

    // Jika user ditemukan, kirim data user dan username ke view
    if (results.length > 0) {
      var user = results[0];
      res.render('profil', { title: 'Profile', user: user, username: username });
    } else {
      res.send('User not found');
    }
  });
});

module.exports = router;