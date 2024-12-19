const express = require('express');
const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');
const { validateProductCreation, validateProductId } = require('../middlewares/validators/productValidator');
const { validateRequest } = require('../middlewares/errorHandler');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getAllProducts);
router.get('/:id', authMiddleware, validateProductId, validateRequest, getProductById);
router.post('/', authMiddleware, validateProductCreation, validateRequest, createProduct);
router.put('/:id', authMiddleware, validateProductId, validateRequest, updateProduct);
router.delete('/:id', authMiddleware, validateProductId, validateRequest, deleteProduct);

module.exports = router;

