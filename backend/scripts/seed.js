const mongoose = require('mongoose');
const Post = require('../models/Post');
const Image = require('../models/Image');
const { MONGO_URI } = require('../config');

const seedData = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB Connected');

        await Post.deleteMany({});
        await Image.deleteMany({});
        console.log('Data cleared');

        const image = await Image.create({
            filename: 'sample.jpg',
            url: 'https://via.placeholder.com/800x400',
            altText: 'Sample Image',
            uploadedBy: 'Admin'
        });

        console.log('Image created:', image);

        try {
            await Post.create({
                title: 'Welcome to the New Blog',
                slug: 'welcome-to-new-blog',
                content: '<h1>Welcome!</h1><p>This is a sample post created by the seed script.</p>',
                excerpt: 'This is a sample post.',
                featuredImage: image._id,
                tags: ['welcome', 'sample']
            });
            console.log('Post created');
        } catch (postErr) {
            console.error('Post creation failed:', postErr);
        }

        console.log('Sample data seeded');
        process.exit();
    } catch (err) {
        console.error('Seed failed:', err);
        process.exit(1);
    }
};

seedData();
