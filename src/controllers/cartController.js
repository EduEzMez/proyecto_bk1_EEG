const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Crear un carrito
const createCart = async (req, res) => {
    try {
        const newCart = new Cart({ products: [] });
        await newCart.save();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el carrito', error });
    }
};

// Obtener un carrito por ID
const getCartById = async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await Cart.findById(id).populate('products.product');
        if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el carrito', error });
    }
};

// Agregar un producto al carrito
const addProductToCart = async (req, res) => {
    try {
        const { id } = req.params;
        const { productId, quantity } = req.body;

        const cart = await Cart.findById(id);
        if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

        const existingProduct = cart.products.find((p) => p.product.toString() === productId);

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar el producto al carrito', error });
    }
};

// Eliminar un producto del carrito
const removeProductFromCart = async (req, res) => {
    try {
        const { id, productId } = req.params;

        const cart = await Cart.findById(id);
        if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

        cart.products = cart.products.filter((p) => p.product.toString() !== productId);

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto del carrito', error });
    }
};

// Eliminar el carrito completo
const deleteCart = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCart = await Cart.findByIdAndDelete(id);
        if (!deletedCart) return res.status(404).json({ message: 'Carrito no encontrado' });
        res.status(200).json({ message: 'Carrito eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el carrito', error });
    }
};

module.exports = {
    createCart,
    getCartById,
    addProductToCart,
    removeProductFromCart,
    deleteCart,
};
