const router = require('express').Router();

const productosRoutes = require('./productos');
const ventasRoutes = require('./ventas');

router.use('/productos', productosRoutes);
router.use('/ventas', ventasRoutes);

router.get('/', (req, res) => {
  res.json({
    message: 'API Market - Prueba Técnica Node.js',
    version: '1.0.0',
    endpoints: {
      productos_con_stock: 'GET /api/productos',
      top_10_mas_vendidos: 'GET /api/ventas/productos-mas-vendidos'
    }
  });
});

module.exports = router;
