const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ProductoCategoria = sequelize.define('productos_categorias', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  id_categoria: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false },
  id_producto: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false }
}, {
  tableName: 'productos_categorias',
  timestamps: false
});

module.exports = ProductoCategoria;
