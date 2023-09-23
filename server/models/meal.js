const mongoose = require('mongoose');
const productSchema = require('./product');

const mealSchema = new mongoose.Schema({
  mealName: {
    type: String,
    required: true,
    trim: true,
  },
  products: [
    {
      productName: { type: String, ref: productSchema },
      productAmount: Number
    },
  ],
});

module.exports = mongoose.model('Meal', mealSchema);
