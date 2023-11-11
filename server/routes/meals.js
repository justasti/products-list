const express = require('express')
const router = express.Router()

// Import models
const Meal = require('../models/meal')
const Product = require('../models/product')

// Validation related imports
const validateSchema = require('../middleware/validate')
const mealValidation = require('../validation/mealValidation')

// Create a new meal
router.post('/', validateSchema(mealValidation), async (req, res) => {
  try {
    const meal = {
      _id: req.body.id,
      name: req.body.name,
      products: req.body.products,
    }

    await Meal.create(meal)

    const createdProducts = []
    const failedProducts = []

    for (const product of meal.products) {
      const existingProduct = await Product.findOne({
        name: product.name,
      }).exec()

      if (!existingProduct) {
        try {
          const newProduct = await Product.create(product)
          createdProducts.push(newProduct)
        } catch (error) {
          failedProducts.push({
            name: product.name,
            error: 'Failed to create product',
          })
        }
      }
    }

    if (failedProducts.length > 0) {
      res.status(207).json({
        meal,
        createdProducts,
        failedProducts,
      })
    } else {
      res.status(201).json(meal)
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Could not create meal', message: error.message })
  }
})

// Read all meals
router.get('/', async (_req, res) => {
  try {
    const meals = await Meal.find()
    res.status(200).json(meals)
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch meals' })
  }
})

// Read a single meal by ID
router.get('/:id', async (req, res) => {
  try {
    const meal = await Meal.findOne({ _id: req.params.id })
    if (!meal) {
      return res.status(404).json({ error: 'Meal not found' })
    }
    res.status(200).json(meal)
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch meal' })
  }
})

// Update a meal
router.put('/:id', validateSchema(mealValidation), async (req, res) => {
  try {
    const meal = await Meal.findByIdAndUpdate(req.params._id, req.body, {
      new: true,
    })
    res.status(200).json(meal)
  } catch (error) {
    res.status(500).json({ error: 'Could not update meal' })
  }
})

// Delete a meal
router.delete('/:id', async (req, res) => {
  try {
    await Meal.findByIdAndRemove(req.params._id)
    res.status(200).json({ message: 'Meal deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Could not delete meal' })
  }
})

module.exports = router
