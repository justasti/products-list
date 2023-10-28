const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  uniqueId: {
    type: String,
    required: true,
    default: () => nanoid(),
    index: { unique: true },
  },
  productName: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Product', productSchema);
