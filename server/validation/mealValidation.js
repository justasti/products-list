const { body } = require('express-validator');

const mealValidation = [
  body('mealName').notEmpty().withMessage('Patiekalo pavadinimas privalomas'),
  body('products').isArray().withMessage('Neteisingai įvesti produktai'),
]

module.exports = mealValidation;