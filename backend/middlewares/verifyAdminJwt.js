const jwt = require('jsonwebtoken');
require('dotenv').config();
const userModel = require('../models/userModels');

const verifyAdminJwt = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    const user = await userModel.findById(decoded.id);
    if (!user) return res.status(401).json({ message: 'User not found' });

    req.userId = user._id;
    req.role = user.role;
    next();
  } catch (err) {
    console.log("❌ JWT Error:", err.message);
    return res.status(403).json({ message: 'Forbidden: Invalid token' });
  }
};

module.exports = verifyAdminJwt;
