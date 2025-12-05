const Image = require('../models/Image');
const cloudinary = require('../cloudinary');

// @desc    Upload an image
// @route   POST /api/images/upload
// @access  Admin
const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Upload to Cloudinary using buffer
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: 'anti-blog',
                resource_type: 'image',
            },
            async (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    return res.status(500).json({ message: 'Error uploading to Cloudinary' });
                }

                try {
                    const image = new Image({
                        filename: req.file.originalname,
                        url: result.secure_url,
                        cloudinaryId: result.public_id,
                        altText: req.body.altText || req.file.originalname,
                        uploadedBy: 'Admin'
                    });

                    const savedImage = await image.save();
                    res.status(201).json({ ok: true, image: savedImage });
                } catch (err) {
                    console.error('Database save error:', err);
                    // Delete from Cloudinary if database save fails
                    await cloudinary.uploader.destroy(result.public_id);
                    res.status(500).json({ message: 'Error saving image data' });
                }
            }
        );

        // Pipe the buffer to Cloudinary
        const bufferStream = require('stream').Readable.from(req.file.buffer);
        bufferStream.pipe(uploadStream);
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

        // Delete from Cloudinary
        if (image.cloudinaryId) {
            await cloudinary.uploader.destroy(image.cloudinaryId);
        }

        await image.deleteOne();
        res.json({ message: 'Image deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    uploadImage,
    getImages,
    deleteImage
};

