// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//     const token = req.header('Authorization')?.split(' ')[1];
//     if (!token) {
//         return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
//     }

//     try {
//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = verified;
//         next();
//     } catch (error) {
//         res.status(401).json({ message: 'Token no válido.' });
//     }
// };

// module.exports = authMiddleware;


// Elimina la importación de jsonwebtoken
// const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Puedes optar por realizar otra verificación, por ejemplo, autenticación básica
    // O simplemente puedes permitir el acceso sin verificar ningún token

    // Aquí puedes poner tu lógica de autorización personalizada, si lo deseas.
    // Si no necesitas ninguna verificación, puedes simplemente llamar a `next()` directamente.

    next();  // Permite que la petición continúe
};

module.exports = authMiddleware;
