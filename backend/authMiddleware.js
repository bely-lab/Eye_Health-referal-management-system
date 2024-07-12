const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    console.log('No token provided');
    return res.sendStatus(401); // If no token, return Unauthorized
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Token verification failed:', err);
      return res.sendStatus(403); // If token is invalid or expired, return Forbidden
    }
    console.log('Token verified successfully:', user);
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
