const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Producto = sequelize.define('productos', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  estado: { type: DataTypes.TINYINT.UNSIGNED, allowNull: false },
  kit: { type: DataTypes.TINYINT.UNSIGNED },
  barcode: { type: DataTypes.STRING(30) },
  nombre: { type: DataTypes.STRING(60), allowNull: false },
  presentacion: { type: DataTypes.STRING(25) },
  descripcion: { type: DataTypes.STRING(500) },
  foto: { type: DataTypes.STRING(120) },
  peso: { type: DataTypes.DECIMAL(6, 2) }
}, {
  tableName: 'productos',
  timestamps: false
});

module.exports = Producto;
