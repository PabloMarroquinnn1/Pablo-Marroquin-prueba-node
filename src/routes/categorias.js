const router = require('express').Router();
const { getCategoriasConProductos } = require('../controllers/categoriasController');

router.get('/', getCategoriasConProductos);

module.exports = router;
