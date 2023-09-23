const express = require('express');
const router = express.Router();

// Import model
const Meal = require('../models/meal');

// Validation related imports
const validateSchema = require('../middleware/validate');
const mealValidation = require('../validation/mealValidation');

// Create a new meal
router.post('/', validateSchema(mealValidation), async (req, res) => {
  try {
    const mealData = {
      mealName: req.body.mealName,
      products: req.body.products,
    };

    const meal = await Meal.create(mealData);
    res.status(201).json(meal);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Could not create meal' });
  }
});

// Read all meals
router.get('/', async (_req, res) => {
  try {
    const meals = await Meal.find();
    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch meals' });
  }
});

// Read a single meal by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Meal.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Meal not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch meal' });
  }
});

// Update a meal
router.put('/:id', validateSchema(mealValidation), async (req, res) => {
  try {
    const meal = await Meal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(meal);
  } catch (error) {
    res.status(500).json({ error: 'Could not update meal' });
  }
});

// Delete a meal
router.delete('/:id', async (req, res) => {
  try {
    await Meal.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: 'Meal deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Could not delete meal' });
  }
});

module.exports = router;