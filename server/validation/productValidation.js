const { body } = require('express-validator');

const productValidation = [
  body('name').notEmpty().withMessage('Product name is required'),
  body('categories').isArray().notEmpty().withMessage('Product category is required'),
]

module.exports = productValidation;