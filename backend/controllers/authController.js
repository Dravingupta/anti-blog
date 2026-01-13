const jwt = require('jsonwebtoken');
const { ADMIN_USERNAME, ADMIN_PASSWORD, JWT_SECRET } = require('../config');


const login = (req, res) => {
    const { username, password } = req.body;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        const token = jwt.sign({ role: 'admin', username }, JWT_SECRET, {
            expiresIn: '7d'
        });
        res.json({ ok: true, token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

module.exports = { login };
