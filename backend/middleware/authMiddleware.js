const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET);

            // Attach user to request (excluding password)
            // If we want to be safe, we should fetch from DB to ensure user still exists/has role
            // For now, using decoded payload is faster but less secure if roles change
            // Let's try to fetch user if possible, or just use decoded
            // The previous code used decoded.role directly. 
            // Let's stick to decoded for now but remove the admin check.
            req.user = decoded;

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = protect;
