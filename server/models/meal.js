const mongoose = require('mongoose');
const productSchema = require('./product');
const nanoid = import('nanoid')

const mealSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: nanoid,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  products: [
    {
      _id: { type: String, default: nanoid, ref: productSchema },
      name: { type: String, ref: productSchema },
      amount: Number,
    },
  ],
})

module.exports = mongoose.model('Meal', mealSchema);
