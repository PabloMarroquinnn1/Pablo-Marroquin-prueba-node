const Tienda = require('./Tienda');
const Producto = require('./Producto');
const Categoria = require('./Categoria');
const ProductoCategoria = require('./ProductoCategoria');
const ProductoStock = require('./ProductoStock');
const Promocion = require('./Promocion');
const TiendaPromocion = require('./TiendaPromocion');
const Pedido = require('./Pedido');
const PedidoProducto = require('./PedidoProducto');

Producto.belongsToMany(Categoria, {
  through: ProductoCategoria,
  foreignKey: 'id_producto',
  otherKey: 'id_categoria',
  as: 'categorias'
});

Categoria.belongsToMany(Producto, {
  through: ProductoCategoria,
  foreignKey: 'id_categoria',
  otherKey: 'id_producto',
  as: 'productos'
});

Producto.hasMany(ProductoStock, { foreignKey: 'id_producto', as: 'stocks' });
ProductoStock.belongsTo(Producto, { foreignKey: 'id_producto', as: 'producto' });

Tienda.hasMany(ProductoStock, { foreignKey: 'id_tienda', as: 'stocks' });
ProductoStock.belongsTo(Tienda, { foreignKey: 'id_tienda', as: 'tienda' });

Promocion.belongsToMany(Tienda, {
  through: TiendaPromocion,
  foreignKey: 'id_promocion',
  otherKey: 'id_tienda',
  as: 'tiendas'
});

Tienda.belongsToMany(Promocion, {
  through: TiendaPromocion,
  foreignKey: 'id_tienda',
  otherKey: 'id_promocion',
  as: 'promociones'
});

Promocion.hasMany(TiendaPromocion, { foreignKey: 'id_promocion', as: 'tienda_promociones' });
TiendaPromocion.belongsTo(Promocion, { foreignKey: 'id_promocion', as: 'promocion' });

TiendaPromocion.belongsTo(Tienda, { foreignKey: 'id_tienda', as: 'tienda' });
Tienda.hasMany(TiendaPromocion, { foreignKey: 'id_tienda', as: 'tienda_promociones' });

Pedido.belongsToMany(Producto, {
  through: PedidoProducto,
  foreignKey: 'id_pedido',
  otherKey: 'id_producto',
  as: 'productos'
});

Producto.belongsToMany(Pedido, {
  through: PedidoProducto,
  foreignKey: 'id_producto',
  otherKey: 'id_pedido',
  as: 'pedidos'
});

PedidoProducto.belongsTo(Producto, { foreignKey: 'id_producto', as: 'producto' });
PedidoProducto.belongsTo(Pedido, { foreignKey: 'id_pedido', as: 'pedido' });
PedidoProducto.belongsTo(Promocion, { foreignKey: 'id_promocion', as: 'promocion' });

Pedido.belongsTo(Tienda, { foreignKey: 'id_tienda', as: 'tienda' });
Tienda.hasMany(Pedido, { foreignKey: 'id_tienda', as: 'pedidos' });

module.exports = {
  Tienda,
  Producto,
  Categoria,
  ProductoCategoria,
  ProductoStock,
  Promocion,
  TiendaPromocion,
  Pedido,
  PedidoProducto
};
