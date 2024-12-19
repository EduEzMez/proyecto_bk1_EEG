const express = require('express');
const {
    createCart,
    getCartById,
    addProductToCart,
    removeProductFromCart,
    deleteCart,
} = require('../controllers/cartController');
const { validateCartId, validateAddProductToCart } = require('../middlewares/validators/cartValidator');
const { validateRequest } = require('../middlewares/errorHandler');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createCart);
router.get('/:id', authMiddleware, validateCartId, validateRequest, getCartById);
router.post('/:id/products', authMiddleware, validateCartId, validateAddProductToCart, validateRequest, addProductToCart);
router.delete('/:id/products/:productId', authMiddleware, validateCartId, validateRequest, removeProductFromCart);
router.delete('/:id', authMiddleware, validateCartId, validateRequest, deleteCart);

module.exports = router;

