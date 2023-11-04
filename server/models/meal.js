const mongoose = require('mongoose');
const productSchema = require('./product');

const mealSchema = new mongoose.Schema({
  uniqueId: {
    type: String,
    required: true,
    default: () => nanoid(),
    index: { unique: true },
  },
  mealName: {
    type: String,
    required: true,
    trim: true,
  },
  products: [
    {
      uniqueId: {
        type: String,
        required: true,
        default: () => nanoid(),
        index: { unique: true },
      },
      productName: { type: String, ref: productSchema },
      productAmount: Number,
    },
  ],
})

module.exports = mongoose.model('Meal', mealSchema);
