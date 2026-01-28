const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Categoria = sequelize.define('categorias', {
  id: { type: DataTypes.SMALLINT.UNSIGNED, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(30), allowNull: false },
  adultos: { type: DataTypes.TINYINT.UNSIGNED }
}, {
  tableName: 'categorias',
  timestamps: false
});

module.exports = Categoria;
