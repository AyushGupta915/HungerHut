const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    items: [
      {
        _id: false, // prevents MongoDB from auto-generating _id for subdocuments
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true }
      }
    ],

    totalAmount: { type: Number, required: true },

    address: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipcode: { type: String, required: true },
      country: { type: String, required: true },
      phoneNumber: { type: String, required: true }
    },

    status: { type: String, default: 'Food Processing' },

    payment: { type: Boolean, default: false },

    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

// Fix the model registration
const orderModel = mongoose.models.Order || mongoose.model('Order', orderSchema);
module.exports = orderModel;
