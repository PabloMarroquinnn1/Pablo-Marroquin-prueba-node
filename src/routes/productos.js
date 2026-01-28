const router = require('express').Router();
const { getProductosConStock } = require('../controllers/productosController');

router.get('/', getProductosConStock);

module.exports = router;
