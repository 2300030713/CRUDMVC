// backend/routes/facultyRoutes.js
const express = require('express');
const { createFaculty, getFaculty, updateFaculty, deleteFaculty } = require('../controllers/facultyController');
const router = express.Router();

router.post('/faculty', createFaculty);
router.get('/faculty', getFaculty);
router.put('/faculty/:id', updateFaculty);
router.delete('/faculty/:id', deleteFaculty);

module.exports = router;