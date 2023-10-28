const { body } = require('express-validator');

const productValidation = [
  body('uniqueId').notEmpty().withMessage('ID privalomas'),
  body('productName').notEmpty().withMessage('Produkto pavadinimas privalomas'),
]

module.exports = productValidation;