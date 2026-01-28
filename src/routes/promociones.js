const router = require('express').Router();
const { getPromocionesPorDia } = require('../controllers/promocionesController');

router.get('/dia/:dia', getPromocionesPorDia);

module.exports = router;