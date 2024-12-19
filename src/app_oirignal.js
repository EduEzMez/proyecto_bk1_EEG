

const connectDB = require('./config/db');


connectDB();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// Configuración de Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('src/public'));

// Rutas
app.use('/api/products', require('./routes/products'));
app.use('/api/carts', require('./routes/carts'));

// Vista Home
app.get('/', async (req, res) => {
  const products = await ProductManager.getProducts();
  res.render('home', { products });
});

// Vista Real-Time
app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts');
});

// Configuración de WebSockets
io.on('connection', async (socket) => {
  console.log('Cliente conectado');

  // Emitir productos iniciales
  const products = await ProductManager.getProducts();
  socket.emit('products', products);

  // Escuchar cuando se agrega un nuevo producto
  socket.on('addProduct', async (productData) => {
    try {
      await ProductManager.addProduct(productData);
      const updatedProducts = await ProductManager.getProducts();
      io.emit('products', updatedProducts); // Emitir productos actualizados a todos los clientes
    } catch (error) {
      socket.emit('errorMessage', error.message); // Enviar mensaje de error al cliente
    }
  });

  // Escuchar cuando se elimina un producto
  socket.on('delete-product', async (id) => {
    try {
      await ProductManager.deleteProduct(id);
      const updatedProducts = await ProductManager.getProducts();
      io.emit('products', updatedProducts); // Emitir productos actualizados a todos los clientes
    } catch (error) {
      socket.emit('errorMessage', 'Error al eliminar el producto.');
    }
  });
});

// Iniciar servidor
const PORT = 8080;
httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});






