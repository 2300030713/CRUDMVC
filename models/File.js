// backend/models/File.js
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  // Optional: associate with student if needed
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', // Referencing the Student model (if the file belongs to a student)
  },
});

module.exports = mongoose.model('File', fileSchema);

