const { body } = require('express-validator');

const productValidation = [
  body('productName').notEmpty().withMessage('Produkto pavadinimas privalomas'),
];

module.exports = productValidation;