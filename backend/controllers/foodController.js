const foodModel = require('../models/foodModels');
const { cloudinary } = require('../config/cloudinary');

const addFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    // Check required fields
    if (!name || !description || !price || !category || !req.file) {
      return res.status(400).json({ error: 'All fields including image are required' });
    }

    // Create and save food item
    const newFood = new foodModel({
      name,
      description,
      price,
      category,
      image: req.file.path, // Cloudinary URL
    });

    await newFood.save();
    res.status(201).json({ message: 'Food item added successfully', food: newFood });
  } catch (err) {
    console.error('Error in addFood:', err);
    res.status(500).json({ error: 'Server error while adding food item' });
  }
};

const getAllFood = async(req,res) => {
    try{
        const foods = await foodModel.find();
        res.status(200).json(foods);
    }
    catch(err){
        console.error('Error in getAllFood:', err);
        res.status(500).json({ error: 'Server error while fetching food items' });
    }
}

const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await foodModel.findById(id);

    if (!food) {
      return res.status(404).json({ error: 'Food item not found' });
    }

    const extractPublicId = (url) => {
      const parts = url.split('/');
      const filename = parts.pop().split('.')[0];
      const folder = parts.pop();
      return `${folder}/${filename}`;
    };

    const publicId = extractPublicId(food.image);

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Delete from DB
    await foodModel.findByIdAndDelete(id);

    res.status(200).json({ message: 'Food item deleted successfully' });
  } catch (err) {
    console.error('Error deleting food:', err);
    res.status(500).json({ error: 'Failed to delete food item' });
  }
};



module.exports = { addFood , getAllFood, deleteFood };
