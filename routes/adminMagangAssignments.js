var express = require('express');
var router = express.Router();
const tugasController = require('../controllers/tugasController');

module.exports = (upload) => {
  router.get('/', tugasController.getAssignmentsPage);

  router.get('/all', tugasController.getAllTugas);
  router.post('/add', upload.single('file_tugas'), tugasController.addTugas);

  // Route untuk mendapatkan tugas berdasarkan ID
  router.get('/:id', tugasController.getTugasById);

  // Route untuk memperbarui tugas
  router.put('/:id', tugasController.updateTugas);

  return router;
};
