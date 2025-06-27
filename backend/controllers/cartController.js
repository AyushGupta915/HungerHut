const userModel = require('../models/userModels');

// Add to Cart
const addToCart = async (req, res) => {
  try {
    console.log("🛒 Reached addToCart route");
    console.log("🔐 User ID:", req.userId);

    const { itemId } = req.body;
    if (!itemId) {
      return res.status(400).json({ error: "Item ID is missing" });
    }

    const user = await userModel.findById(req.userId);
    if (!user) {
      console.log("❌ User not found");
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.cartData) {
      user.cartData = {};
    }

    const currentQty = user.cartData[itemId] || 0;
    user.cartData[itemId] = currentQty + 1;

    user.markModified('cartData'); // ⚠️ Important
    await user.save();

    console.log("✅ Cart updated:", user.cartData);
    return res.status(200).json({
      message: 'Item added to cart',
      cartData: user.cartData
    });

  } catch (error) {
    console.error('❌ Error in addToCart:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};



// Remove from Cart
const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.body;
    if (!itemId) {
      return res.status(400).json({ error: 'Item ID is required' });
    }

    const user = await userModel.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const cart = user.cartData || {};

    if (cart[itemId]) {
      cart[itemId] -= 1;

      if (cart[itemId] <= 0) {
        delete cart[itemId];
      }

      user.cartData = cart;
      user.markModified('cartData');
      await user.save();

      return res.status(200).json({
        message: 'Item removed from cart',
        cartData: cart
      });
    }

    return res.status(400).json({ error: 'Item not in cart' });
  } catch (error) {
    console.error('❌ Error removing from cart:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


// Get Cart
const getCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    return res.status(200).json({
      cartData: user.cartData || {}
    });
  } catch (error) {
    console.error('❌ Error fetching cart:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = { addToCart, removeFromCart, getCart };
