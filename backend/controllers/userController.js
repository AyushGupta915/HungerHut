const userModel = require('../models/userModels');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN_SECRET);
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate inputs
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        error: 'Password should be at least 8 characters long and include an uppercase letter, a number, and a symbol.'
      });
    }

    // ✅ Check if user already exists first
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // ✅ Hash and save new user
    const hash = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      name,
      email,
      password: hash,
    });

    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error('Register error:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Server error during registration' });
    }
  }
};


const loginUser = async (req, res) => {
    try {
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate token
    const token = createToken(user._id);

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
}

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find user by email
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // 2. Check if user is an admin
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Not an admin' });
    }

    // 3. Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // 4. Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    // 5. Send token in response
    res.status(200).json({ token });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {loginUser, registerUser, adminLogin};