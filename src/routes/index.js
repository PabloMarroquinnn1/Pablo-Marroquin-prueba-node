const router = require('express').Router();

const productosRoutes = require('./productos');

router.use('/productos', productosRoutes);

router.get('/', (req, res) => {
  res.json({
    message: 'API Market - Prueba Técnica Node.js',
    version: '1.0.0',
    endpoints: {
      productos_con_stock: 'GET /api/productos'
    }
  });
});

module.exports = router;
