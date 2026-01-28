const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Tienda = sequelize.define('tiendas', {
  id: { type: DataTypes.SMALLINT.UNSIGNED, primaryKey: true, autoIncrement: true },
  estado: { type: DataTypes.TINYINT.UNSIGNED, allowNull: false },
  nombre: { type: DataTypes.STRING(30), allowNull: false },
  descripcion: { type: DataTypes.STRING(500) },
  telefono: { type: DataTypes.STRING(20) },
  direccion: { type: DataTypes.STRING(120) },
  direccion_anexo: { type: DataTypes.STRING(40) },
  direccion_barrio: { type: DataTypes.STRING(25) },
  calificacion: { type: DataTypes.DECIMAL(3, 2) },
  calificacion_cantidad: { type: DataTypes.MEDIUMINT.UNSIGNED },
  impuestos: { type: DataTypes.TINYINT.UNSIGNED },
  dias_trabajo: { type: DataTypes.STRING(21) }
}, {
  tableName: 'tiendas',
  timestamps: false
});

module.exports = Tienda;
