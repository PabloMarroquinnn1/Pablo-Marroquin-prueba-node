const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const PedidoProducto = sequelize.define('pedidos_productos', {
  id: { type: DataTypes.MEDIUMINT.UNSIGNED, primaryKey: true, autoIncrement: true },
  cantidad: { type: DataTypes.DECIMAL(9, 4).UNSIGNED, allowNull: false },
  valor_unitario: { type: DataTypes.DECIMAL(11, 3).UNSIGNED },
  valor_unitario_promocion: { type: DataTypes.DECIMAL(11, 3).UNSIGNED },
  total_teorico: { type: DataTypes.DECIMAL(12, 3).UNSIGNED },
  total_final: { type: DataTypes.DECIMAL(12, 3).UNSIGNED },
  id_promocion: { type: DataTypes.MEDIUMINT.UNSIGNED },
  id_producto: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  id_pedido: { type: DataTypes.MEDIUMINT.UNSIGNED, allowNull: false }
}, {
  tableName: 'pedidos_productos',
  timestamps: false
});

module.exports = PedidoProducto;
