const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true }, 
    excerpt: { type: String },
    featuredImage: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
    tags: [String],
    isDraft: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

postSchema.pre('save', async function () {
    this.updatedAt = Date.now();
});

module.exports = mongoose.model('Post', postSchema);
