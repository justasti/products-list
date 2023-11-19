const { body } = require('express-validator');

const productValidation = [body('name').notEmpty().withMessage('Product name is required')]

module.exports = productValidation;