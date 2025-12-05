const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../server');
const User = require('../models/User');
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    await User.deleteMany({});
    await Post.deleteMany({});
});

describe('Post API', () => {
    let token;
    let userId;

    beforeEach(async () => {
        const user = await User.create({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
            role: 'admin'
        });
        userId = user._id;
        token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    });

    it('should create a new post', async () => {
        const res = await request(app)
            .post('/api/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Test Post',
                content: '<p>Test Content</p>',
                status: 'published'
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body.title).toEqual('Test Post');
        expect(res.body.slug).toEqual('test-post');
    });

    it('should get all posts', async () => {
        await Post.create({
            title: 'Post 1',
            content: 'Content 1',
            authorId: userId,
            status: 'published'
        });

        const res = await request(app).get('/api/posts');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(1);
    });

    it('should update a post and create version', async () => {
        const post = await Post.create({
            title: 'Old Title',
            content: '<p>Old Content</p>',
            authorId: userId,
            status: 'draft'
        });

        const res = await request(app)
            .put(`/api/posts/${post._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'New Title',
                content: '<p>New Content</p>'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.title).toEqual('New Title');

        const updatedPost = await Post.findById(post._id);
        expect(updatedPost.versions.length).toBeGreaterThan(0);
        expect(updatedPost.versions[0].title).toEqual('Old Title');
    });
});
