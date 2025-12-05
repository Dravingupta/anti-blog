const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    url: { type: String, required: true },
    cloudinaryId: { type: String }, // Cloudinary public_id for deletion
    altText: { type: String },
    uploadedBy: { type: String, default: 'Admin' },
    width: Number,
    height: Number,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Image', imageSchema);
