const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJwt = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log("❌ JWT verification error:", err.message);
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }

    if (!decoded.id) {
      return res.status(403).json({ message: 'Forbidden: Token missing user ID' });
    }

    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyJwt;
