const express = require('express');
const connectDB = require('./config/db');
const { engine } = require( 'express-handlebars');

const app = express();

// Conectar a la base de datos
connectDB();






// Configuración de Handlebars
app.engine('handlebars', engine()); // Aquí se configura Handlebars como motor de plantillas
app.set('view engine', 'handlebars'); // Establece Handlebars como motor de vistas
app.set('views', './src/views'); // Aquí se indica la carpeta donde están tus vistas

// Definir la ruta para renderizar la vista principal
app.get('/', (req, res) => {
  res.render('layouts/main'); // Aquí renderizamos el archivo main.handlebars
});





// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
//app.use('/', require('./routes/products'));
app.use('/api/products', require('./routes/products'));
app.use('/api/carts', require('./routes/carts'));

// Configurar el puerto
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
