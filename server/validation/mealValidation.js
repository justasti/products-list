const { body } = require('express-validator');

const mealValidation = [
  body('uniqueId').notEmpty().withMessage('ID privaloams'),
  body('mealName').notEmpty().withMessage('Patiekalo pavadinimas privalomas'),
  body('products').isArray().withMessage('Neteisingai įvesti produktai'),
]

module.exports = mealValidation;