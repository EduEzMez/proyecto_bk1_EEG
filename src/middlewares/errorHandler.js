const { validationResult } = require('express-validator');

// Middleware para capturar errores de validación
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Middleware para manejar errores globales
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Ocurrió un error inesperado',
        error: err.message,
    });
};

module.exports = {
    validateRequest,
    errorHandler,
};
