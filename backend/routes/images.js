const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { uploadImage, getImages, deleteImage } = require('../controllers/imagesController');
const protect = require('../middleware/authMiddleware');

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|webp|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Images Only!');
        }
    }
});

router.post('/upload', protect, upload.single('image'), uploadImage);
router.get('/', protect, getImages);
router.delete('/:id', protect, deleteImage);

module.exports = router;
