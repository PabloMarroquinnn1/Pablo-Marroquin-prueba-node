const router = require('express').Router();
const { getTopProductosMasVendidos } = require('../controllers/ventasController');

router.get('/productos-mas-vendidos', getTopProductosMasVendidos);

module.exports = router;
