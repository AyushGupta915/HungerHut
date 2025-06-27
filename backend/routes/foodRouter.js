const express = require('express');
const { addFood, getAllFood, deleteFood } = require('../controllers/foodController');
const foodRouter = express.Router();
const multer = require('multer');

// ⬇️ Import Cloudinary storage
const { storage } = require('../config/cloudinary');

// ⬇️ Set up multer with Cloudinary storage
const upload = multer({ storage });

// ✅ Route with image upload
foodRouter.post('/add', upload.single('image'), addFood);

foodRouter.get('/list', getAllFood);

foodRouter.delete('/:id', deleteFood);

module.exports = foodRouter;
