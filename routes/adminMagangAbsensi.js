const express = require('express');
const router = express.Router();
const { jadwal_kegiatan, absen_kegiatan, user } = require('../models');

router.get('/', async (req, res) => {
  try {
    const meetings = await jadwal_kegiatan.findAll();
    res.render('labor/adminMagangAbsensi', { meetings });
  } catch (error) {
    console.error('Error fetching meetings:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/attendance/:keterangan', async (req, res) => {
  try {
    const { keterangan } = req.params;
    const meeting = await jadwal_kegiatan.findOne({ where: { keterangan } });
    const users = await user.findAll();
    res.render('labor/attendanceForm', { meeting, users });
  } catch (error) {
    console.error('Error fetching attendance form:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/create-meeting', async (req, res) => {
  try {
    const { jadwal, description } = req.body;
    await jadwal_kegiatan.create({ jadwal, keterangan: description });
    res.redirect('/adminMagangAbsensi');
  } catch (error) {
    console.error('Error creating meeting:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/save-attendance', async (req, res) => {
    const { id_jadwal, id_user, kehadiran } = req.body;
    
    console.log('Received data:', req.body); // Logging untuk debug
    console.log('id_user:', id_user); // Logging untuk debug
    
    if (!id_user) {
        return res.status(400).send('User ID is required');
    }

    try {
        const foundUser = await user.findOne({ where: { id_user } });
        if (!foundUser) {
            return res.status(400).send('Invalid user ID');
        }
        
        await absen_kegiatan.create({ id_jadwal, id_user, kehadiran });
        res.status(200).send('Attendance saved successfully');
    } catch (error) {
        console.error('Error saving attendance:', error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;
