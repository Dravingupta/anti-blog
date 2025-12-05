const express = require('express');
const cors = require('cors');
const path = require('path');
const { PORT } = require('./config');
const connectDB = require('./db');

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://anti-blog.vercel.app'
    ],
    credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/images', require('./routes/images'));

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Local: http://localhost:${PORT}`);
    console.log(`Network: http://192.168.1.9:${PORT}`);
});
