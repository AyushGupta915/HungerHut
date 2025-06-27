const orderModel = require('../models/orderModel');
const userModel = require('../models/userModels');
const stripe = require('stripe')(process.env.STRIPE_KEY); // ✅ Make sure to use your secret key

const placeOrder = async (req, res) => {
  const userFrontend_url = 'https://hunger-hut.vercel.app';

  try {
    // ✅ Create new order
    const newOrder = await orderModel.create({
      userId: req.userId,
      items: req.body.items,
      totalAmount: req.body.totalAmount,
      address: req.body.address
    });

    // ✅ Clear user's cart
    await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

    // ✅ Build Stripe line items
    const line_items = req.body.items.map(item => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.name
        },
        unit_amount: item.price * 100, // Stripe expects in paise
      },
      quantity: item.quantity
    }));

    // ✅ Add delivery fee
    line_items.push({
      price_data: {
        currency: 'inr',
        product_data: {
          name: 'Delivery Fee'
        },
        unit_amount: 20 * 100,
      },
      quantity: 1
    });

    // ✅ Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${userFrontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${userFrontend_url}/verify?success=false&orderId=${newOrder._id}`
    });

    res.json({ sessionurl: session.url });
  } catch (error) {
    console.error('❌ Error placing order:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await orderModel.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.payment = true;
    await order.save();

    res.status(200).json({ message: 'Payment verified successfully' });
  } catch (error) {
    console.error('❌ Error in verifyPayment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (error) {
    console.error('❌ Error fetching orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


module.exports = { placeOrder, verifyPayment, getOrders };
