const { body } = require('express-validator');

const mealValidation = [
  body('name').notEmpty().withMessage('Meal name is required'),
  body('products').isArray().withMessage('Products must be an array'),
]

module.exports = mealValidation;