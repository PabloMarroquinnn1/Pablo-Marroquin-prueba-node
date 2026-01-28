const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ProductoStock = sequelize.define('productos_stocks', {
  id: { type: DataTypes.MEDIUMINT.UNSIGNED, primaryKey: true, autoIncrement: true },
  cantidad: { type: DataTypes.DECIMAL(8, 3), allowNull: false },
  id_tienda: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false },
  id_producto: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  fecha_ingreso: { type: DataTypes.DATEONLY }
}, {
  tableName: 'productos_stocks',
  timestamps: false
});

module.exports = ProductoStock;
