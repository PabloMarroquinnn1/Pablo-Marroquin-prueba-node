const { Producto, ProductoStock, Tienda } = require('../models');

const getProductosConStock = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      attributes: ['id', 'nombre', 'barcode', 'presentacion', 'peso'],
      include: [
        {
          model: ProductoStock,
          as: 'stocks',
          attributes: ['cantidad', 'fecha_ingreso'],
          required: false,
          include: [
            {
              model: Tienda,
              as: 'tienda',
              attributes: ['id', 'nombre', 'direccion', 'telefono']
            }
          ]
        }
      ],
      order: [['id', 'ASC']]
    });

    res.json({
      success: true,
      total: productos.length,
      data: productos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener productos con stock',
      error: error.message
    });
  }
};

module.exports = { getProductosConStock };
