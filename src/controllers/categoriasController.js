const { Categoria, Producto } = require('../models');
const { sequelize } = require('../config/database');

const getCategoriasConProductos = async (req, res) => {
  try {
    const categorias = await Categoria.findAll({
      attributes: [
        'id',
        'nombre',
        'adultos',
        [sequelize.fn('COUNT', sequelize.col('productos.id')), 'cantidad_productos']
      ],
      include: [
        {
          model: Producto,
          as: 'productos',
          attributes: [],
          through: { attributes: [] },
          required: true
        }
      ],
      group: ['categorias.id'],
      order: [[sequelize.literal('cantidad_productos'), 'DESC']],
      subQuery: false
    });

    const data = categorias.map(c => {
      const json = c.toJSON();
      return {
        id: json.id,
        nombre: json.nombre,
        adultos: json.adultos,
        cantidad_productos: Number(json.cantidad_productos)
      };
    });

    res.json({ success: true, total: data.length, data });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener categorías con productos',
      error: error.message
    });
  }
};

module.exports = { getCategoriasConProductos };
