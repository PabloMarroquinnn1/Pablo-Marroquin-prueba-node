const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const TiendaPromocion = sequelize.define('tiendas_promociones', {
  id: { type: DataTypes.MEDIUMINT.UNSIGNED, primaryKey: true, autoIncrement: true },
  estado: { type: DataTypes.TINYINT.UNSIGNED, allowNull: false },
  inicio: { type: DataTypes.DATEONLY, allowNull: false },
  fin: { type: DataTypes.DATEONLY, allowNull: false },
  id_tienda: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false },
  id_promocion: { type: DataTypes.MEDIUMINT.UNSIGNED, allowNull: false }
}, {
  tableName: 'tiendas_promociones',
  timestamps: false
});

module.exports = TiendaPromocion;
