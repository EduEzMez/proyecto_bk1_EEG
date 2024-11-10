import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// Ruta GET /api/products
router.get('/', (req, res) => {
  const { limit } = req.query;
  const productos = JSON.parse(fs.readFileSync(path.resolve('src/public/productos.json')));
  if (limit) {
    return res.json(productos.slice(0, limit));
  }
  res.json(productos);
});

// Ruta GET /api/products/:pid
router.get('/:pid', (req, res) => {
  const { pid } = req.params;
  const productos = JSON.parse(fs.readFileSync(path.resolve('src/public/productos.json')));
  const producto = productos.find(p => p.id == pid);
  if (producto) {
    return res.json(producto);
  }
  res.status(404).json({ message: 'Producto no encontrado' });
});

// Ruta POST /api/products
router.post('/', (req, res) => {
  const { title, description, code, price, status, stock, category, thumbnails } = req.body;
  const productos = JSON.parse(fs.readFileSync(path.resolve('src/public/productos.json')));
  const newProduct = {
    id: "EEG" + Date.now(),
    title,
    description,
    code,
    price,
    status: status || true,
    stock,
    category,
    thumbnails: thumbnails || []
  };
  productos.push(newProduct);
  fs.writeFileSync(path.resolve('src/public/productos.json'), JSON.stringify(productos, null, 2));
  res.status(201).json(newProduct);
});

// Ruta PUT /api/products/:pid
router.put('/:pid', (req, res) => {
  const { pid } = req.params;
  const { title, description, code, price, status, stock, category, thumbnails } = req.body;
  const productos = JSON.parse(fs.readFileSync(path.resolve('src/public/productos.json')));
  const index = productos.findIndex(p => p.id == pid);
  if (index !== -1) {
    productos[index] = { ...productos[index], title, description, code, price, status, stock, category, thumbnails };
    fs.writeFileSync(path.resolve('src/public/productos.json'), JSON.stringify(productos, null, 2));
    return res.json(productos[index]);
  }
  res.status(404).json({ message: 'Producto no encontrado' });
});

// Ruta DELETE /api/products/:pid
router.delete('/:pid', (req, res) => {
  const { pid } = req.params;
  const productos = JSON.parse(fs.readFileSync(path.resolve('src/public/productos.json')));
  const index = productos.findIndex(p => p.id == pid);
  if (index !== -1) {
    productos.splice(index, 1);
    fs.writeFileSync(path.resolve('src/public/productos.json'), JSON.stringify(productos, null, 2));
    return res.status(204).send();
  }
  res.status(404).json({ message: 'Producto no encontrado' });
});

export default router;

