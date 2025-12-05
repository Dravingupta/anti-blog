const Post = require('../models/Post');

// @desc    Get all posts (Public - excludes drafts, Admin - shows all)
// @route   GET /api/posts
// @access  Public
const getPosts = async (req, res) => {
    try {
        // Check if user is admin (req.user is set by authMiddleware)
        const isAdmin = req.user ? true : false;

        // Public users only see published posts, admins see all
        const filter = isAdmin ? {} : { isDraft: false };

        const posts = await Post.find(filter)
            .populate('featuredImage')
            .sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public (but drafts only accessible to admin)
const getPost = async (req, res) => {
    try {
        const { id } = req.params;
        let post;

        // Check if id is ObjectId
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            post = await Post.findById(id).populate('featuredImage');
        } else {
            post = await Post.findOne({ slug: id }).populate('featuredImage');
        }

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // If post is draft, only admin can view
        if (post.isDraft && !req.user) {
            return res.status(403).json({ message: 'This post is not published yet' });
        }

        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Create post
// @route   POST /api/posts
// @access  Admin
const createPost = async (req, res) => {
    try {
        const { title, slug, content, excerpt, featuredImage, tags, isDraft } = req.body;

        console.log('Creating post with isDraft:', isDraft, 'Type:', typeof isDraft);

        const post = new Post({
            title,
            slug,
            content,
            excerpt,
            featuredImage,
            tags,
            isDraft: isDraft !== undefined ? isDraft : false
        });

        const createdPost = await post.save();
        console.log('Created post isDraft value:', createdPost.isDraft);
        res.status(201).json(createdPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Admin
const updatePost = async (req, res) => {
    try {
        const { title, slug, content, excerpt, featuredImage, tags, isDraft } = req.body;
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        post.title = title || post.title;
        post.slug = slug || post.slug;
        post.content = content || post.content;
        post.excerpt = excerpt || post.excerpt;
        post.featuredImage = featuredImage || post.featuredImage;
        post.tags = tags || post.tags;
        if (isDraft !== undefined) post.isDraft = isDraft;

        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Admin
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        await post.deleteOne();
        res.json({ message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
};
