const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const util = require('util');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Konfigurasi koneksi ke MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ubah_password'
});

// Mengubah koneksi menjadi async/await
const query = util.promisify(connection.query).bind(connection);

// Menghubungkan ke database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Mendefinisikan skema tabel pengguna
const userTable = `
    CREATE TABLE IF NOT EXISTS user (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
    )
`;

// Membuat tabel jika belum ada
query(userTable).then(() => {
    console.log('Users table created or already exists');
}).catch((err) => {
    console.error('Error creating user table:', err);
});

// Route to render the form
app.get('/', (req, res) => {
    res.render('index', { message: null });
});

// Route to handle form submission
app.post('/change-password', async (req, res) => {
    const { username, oldPassword, newPassword, confirmPassword } = req.body;

    try {
        // Memeriksa apakah password baru dan konfirmasi password cocok
        if (newPassword !== confirmPassword) {
            return res.render('index', { message: 'Password baru dan konfirmasi password tidak cocok.' });
        }

        // Mengambil pengguna dari database
        const results = await query('SELECT * FROM user WHERE username = ?', [username]);

        // Memastikan pengguna ditemukan
        if (results.length === 0) {
            return res.render('index', { message: 'User not found' });
        }

        const user = results[0];

        // Membandingkan password lama dengan password yang tersimpan
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.render('index', { message: 'Incorrect old password' });
        }

        // Hash password baru
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Menyimpan password baru ke database
        await query('UPDATE user SET password = ? WHERE id = ?', [hashedPassword, user.id]);

        res.render('index', { message: 'Password berhasil diubah.' });
    } catch (err) {
        console.error('Error changing password:', err);
        res.render('index', { message: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
