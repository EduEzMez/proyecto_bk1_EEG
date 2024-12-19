const { body, param } = require('express-validator');

const validateCartId = [
    param('id')
        .isMongoId().withMessage('El ID del carrito no es válido'),
];

const validateAddProductToCart = [
    body('productId')
        .notEmpty().withMessage('El ID del producto es obligatorio')
        .isMongoId().withMessage('El ID del producto no es válido'),
    body('quantity')
        .notEmpty().withMessage('La cantidad es obligatoria')
        .isInt({ min: 1 }).withMessage('La cantidad debe ser un número entero positivo'),
];

module.exports = {
    validateCartId,
    validateAddProductToCart,
};
