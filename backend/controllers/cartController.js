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

    // Initialize cartData if not present
    if (!user.cartData) {
      user.cartData = {};
    }

    const cart = user.cartData;

    const currentQty = cart[itemId] || 0;
    cart[itemId] = currentQty + 1;

    // Save the updated cart back
    user.cartData = cart;
    await user.save();

    console.log("✅ Cart updated:", cart);
    return res.status(200).json({ message: 'Item added to cart', cartData: cart });

  } catch (error) {
    console.error('❌ Error in addToCart:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


// Remove from Cart
const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.body;
    const user = await userModel.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const cart = user.cartData;

    if (!itemId) {
      return res.status(400).json({ error: 'Item ID is required' });
    }

    if (cart.has(itemId)) {
      const newQty = cart.get(itemId) - 1;

      if (newQty <= 0) {
        cart.delete(itemId);
      } else {
        cart.set(itemId, newQty);
      }

      await user.save();
      return res.status(200).json({ message: 'Item removed from cart', cartData: Object.fromEntries(cart) });
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

    return res.status(200).json({ cartData: Object.fromEntries(user.cartData || new Map()) });
  } catch (error) {
    console.error('❌ Error fetching cart:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { addToCart, removeFromCart, getCart };
