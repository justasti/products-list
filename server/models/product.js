const mongoose = require('mongoose');
const nanoid = import('nanoid')

const productSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: nanoid,
  },
  name: {
    type: String,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
})

module.exports = mongoose.model('Product', productSchema);
