const Image = require('../models/Image');
const fs = require('fs');
const path = require('path');

// @desc    Upload an image
// @route   POST /api/images/upload
// @access  Admin
const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const { filename, path: filePath } = req.file;
        const url = `/uploads/${filename}`;

        const image = new Image({
            filename,
            url,
            altText: req.body.altText || filename,
            uploadedBy: 'Admin'
        });

        const savedImage = await image.save();
        res.status(201).json({ ok: true, image: savedImage });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all images
// @route   GET /api/images
// @access  Admin
const getImages = async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};
        if (search) {
            query.filename = { $regex: search, $options: 'i' };
        }

        const images = await Image.find(query).sort({ createdAt: -1 });
        res.json(images);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete an image
// @route   DELETE /api/images/:id
// @access  Admin
const deleteImage = async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }

        // Delete file from filesystem
        const filePath = path.join(__dirname, '..', 'uploads', image.filename);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await image.deleteOne();
        res.json({ message: 'Image deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    uploadImage,
    getImages,
    deleteImage
};
