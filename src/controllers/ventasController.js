const { PedidoProducto, Producto } = require('../models');
const { sequelize } = require('../config/database');

const getTopProductosMasVendidos = async (req, res) => {
  try {
    const rows = await PedidoProducto.findAll({
      attributes: [
        'id_producto',
        [sequelize.fn('SUM', sequelize.col('cantidad')), 'total_vendido']
      ],
      include: [
        {
          model: Producto,
          as: 'producto',
          attributes: ['nombre', 'barcode', 'presentacion'],
          required: true
        }
      ],
      group: ['pedidos_productos.id_producto', 'producto.id'],
      order: [[sequelize.literal('total_vendido'), 'DESC']],
      limit: 10,
      subQuery: false
    });

    const data = rows.map(r => {
      const json = r.toJSON();
      return {
        id_producto: json.id_producto,
        nombre: json.producto?.nombre,
        barcode: json.producto?.barcode,
        presentacion: json.producto?.presentacion,
        total_vendido: Number(json.total_vendido)
      };
    });

    res.json({ success: true, total: data.length, data });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener productos más vendidos',
      error: error.message
    });
  }
};

module.exports = { getTopProductosMasVendidos };
