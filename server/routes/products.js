const express = require('express');
const router = express.Router();

// Import model
const Product = require('../models/product');

// Validation related imports
const validateSchema = require('../middleware/validate');
const productValidation = require('../validation/productValidation');

// Create a new product
router.post('/', validateSchema(productValidation), async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Could not create product' });
  }
});

// Read all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch products' });
  }
});

// Read a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch product' });
  }
});

// Update a product
router.put('/:id', validateSchema(productValidation), async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Could not update product' });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Could not delete product' });
  }
});

module.exports = router;