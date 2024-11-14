const multer = require('multer');
const path = require('path');

// Set up storage engine for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Define the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Filename with timestamp to prevent name conflicts
  }
});

const upload = multer({ storage: storage });

// Controller to handle file upload
exports.uploadFile = upload.single('file'); // 'file' is the field name in the form
