// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const mysql = require('mysql');
const fs = require('fs');

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'reslab'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});

// Konfigurasi multer untuk mengunggah file PDF ke folder public/modul
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/modul');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Endpoint untuk mengunggah file PDF
app.post('/uploads', upload.single('pdf'), function (req, res) {
  try {
    const { judul, keterangan } = req.body;
    const filePath = req.file.path;

    // Simpan informasi file ke database
    const insertQuery = 'INSERT INTO moduls (judul, keterangan, file_path) VALUES (?, ?, ?)';
    db.query(insertQuery, [judul, keterangan, filePath], (err, result) => {
      if (err) {
        console.error(err);
        throw err;
      }
      console.log('File berhasil diunggah');
      res.send('File berhasil diunggah');
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Terjadi kesalahan');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
