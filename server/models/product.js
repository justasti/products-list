const mongoose = require('mongoose');
const nanoid = import('nanoid')

const productSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: nanoid,
  },
  productName: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Product', productSchema);
