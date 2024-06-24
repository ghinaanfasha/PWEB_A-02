const { tugas } = require('../models');
const path = require('path');
const moment = require('moment');

exports.getAllTugas = async (req, res) => {
  try {
    const tugasList = await tugas.findAll();
    res.json(tugasList);
  } catch (err) {
    console.error('Error fetching tugas:', err);
    res.status(500).json({ error: 'Failed to fetch assignments.' });
  }
};

exports.addTugas = async (req, res) => {
  try {
    const { judul_tugas, keterangan, deadline } = req.body;
    const bobot_tugas = req.body.bobot_tugas || 0;
    const file_tugas = req.file ? path.join('uploads', req.file.filename) : null;
    const id_labor = 1; // Sesuaikan dengan logika Anda

    const newTugas = await tugas.create({ id_labor, judul_tugas, keterangan, deadline, file_tugas, bobot_tugas });
    res.status(201).json(newTugas);
  } catch (err) {
    console.error('Error adding tugas:', err);
    res.status(500).json({ error: 'Failed to add assignment.' });
  }
};

exports.getAssignmentsPage = async (req, res) => {
  try {
    const assignments = await tugas.findAll();
    const formattedAssignments = assignments.map(assignment => {
      assignment.formattedDeadline = moment(assignment.deadline).format('DD/MM/YYYY - HH:mm');
      return assignment;
    });
    res.render('labor/adminMagangAssignments', { 
      title: 'Assignments', 
      assignments: formattedAssignments 
    });
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.getTugasById = async (req, res) => {
  try {
    const assignment = await tugas.findByPk(req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    res.json(assignment);
  } catch (err) {
    console.error('Error fetching assignment:', err);
    res.status(500).json({ error: 'Failed to fetch assignment.' });
  }
};

exports.updateTugas = async (req, res) => {
  try {
    const { judul_tugas, keterangan, deadline, bobot_tugas } = req.body;
    const assignment = await tugas.findByPk(req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    assignment.judul_tugas = judul_tugas || assignment.judul_tugas;
    assignment.keterangan = keterangan || assignment.keterangan;
    assignment.deadline = deadline || assignment.deadline;
    assignment.bobot_tugas = bobot_tugas !== undefined ? bobot_tugas : assignment.bobot_tugas;

    await assignment.save();
    res.json(assignment);
  } catch (err) {
    console.error('Error updating assignment:', err);
    res.status(500).json({ error: 'Failed to update assignment.' });
  }
};

exports.getPembobotanPage = async (req, res) => {
  try {
    const assignments = await tugas.findAll();
    res.render('labor/adminPenilaianPembobotan', { 
      title: 'Pembobotan', 
      assignments 
    });
  } catch (error) {
    console.error('Error fetching assignments for pembobotan:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.updatePembobotan = async (req, res) => {
  try {
    const updates = req.body;
    const updatePromises = Object.keys(updates).map(async (key) => {
      if (key.startsWith('bobot_tugas_')) {
        const id_tugas = key.split('_')[2];
        const bobot_tugas = updates[key];
        const assignment = await tugas.findByPk(id_tugas);
        if (assignment) {
          assignment.bobot_tugas = bobot_tugas;
          await assignment.save();
        }
      }
    });
    
    await Promise.all(updatePromises);
    res.redirect('/adminPenilaianPembobotan');
  } catch (err) {
    console.error('Error updating bobot tugas:', err);
    res.status(500).json({ error: 'Failed to update assignment weights.' });
  }
};
