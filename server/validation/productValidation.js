const { body } = require('express-validator');

const productValidation = [
  body('name').notEmpty().withMessage('Produkto pavadinimas privalomas'),
]

module.exports = productValidation;