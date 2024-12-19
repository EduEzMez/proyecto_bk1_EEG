const { body, param } = require('express-validator');

const validateProductCreation = [
    body('name')
        .notEmpty().withMessage('El nombre del producto es obligatorio')
        .isString().withMessage('El nombre debe ser un texto'),
    body('price')
        .notEmpty().withMessage('El precio es obligatorio')
        .isFloat({ gt: 0 }).withMessage('El precio debe ser un número positivo'),
    body('stock')
        .notEmpty().withMessage('El stock es obligatorio')
        .isInt({ min: 0 }).withMessage('El stock debe ser un número entero no negativo'),
];

const validateProductId = [
    param('id')
        .isMongoId().withMessage('El ID del producto no es válido'),
];

module.exports = {
    validateProductCreation,
    validateProductId,
};
