import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// Ruta POST /api/carts
router.post('/', (req, res) => {
  const carrito = { id: Date.now(), products: [] };
  const carritos = JSON.parse(fs.readFileSync(path.resolve('src/public/carrito.json')));
  carritos.push(carrito);
  fs.writeFileSync(path.resolve('src/public/carrito.json'), JSON.stringify(carritos, null, 2));
  res.status(201).json(carrito);
});

// Ruta GET /api/carts para listar todos los carritos
router.get('/', (req, res) => {
  const carritos = JSON.parse(fs.readFileSync(path.resolve('src/public/carrito.json')));
  res.json(carritos);  // Devuelve todos los carritos
});


// Ruta GET /api/carts/:cid
router.get('/:cid', (req, res) => {
  const { cid } = req.params;
  const carritos = JSON.parse(fs.readFileSync(path.resolve('src/public/carrito.json')));
  const carrito = carritos.find(c => c.id == cid);
  if (carrito) {
    return res.json(carrito.products);
  }
  res.status(404).json({ message: 'Carrito no encontrado' });
});

// Ruta POST /api/carts/:cid/product/:pid
router.post('/:cid/product/:pid', (req, res) => {
  const { cid, pid } = req.params;
  const carritos = JSON.parse(fs.readFileSync(path.resolve('src/public/carrito.json')));
  const carrito = carritos.find(c => c.id == cid);
  if (!carrito) {
    return res.status(404).json({ message: 'Carrito no encontrado' });
  }
  const productoExistente = carrito.products.find(p => p.product == pid);
  if (productoExistente) {
    productoExistente.quantity += 1;
  } else {
    carrito.products.push({ product: pid, quantity: 1 });
  }
  fs.writeFileSync(path.resolve('src/public/carrito.json'), JSON.stringify(carritos, null, 2));
  res.status(201).json(carrito);
});

export default router;

