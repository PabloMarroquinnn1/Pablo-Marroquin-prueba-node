const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Pedido = sequelize.define('pedidos', {
  id: { type: DataTypes.MEDIUMINT.UNSIGNED, primaryKey: true, autoIncrement: true },
  instrucciones: { type: DataTypes.STRING(500) },
  entrega_fecha: { type: DataTypes.DATEONLY },
  valor_productos: { type: DataTypes.DECIMAL(12, 3).UNSIGNED },
  valor_envio: { type: DataTypes.DECIMAL(10, 3).UNSIGNED },
  valor_descuento: { type: DataTypes.DECIMAL(11, 3).UNSIGNED },
  valor_cupon: { type: DataTypes.DECIMAL(11, 3).UNSIGNED },
  impuestos: { type: DataTypes.TINYINT.UNSIGNED },
  valor_impuestos: { type: DataTypes.DECIMAL(11, 3).UNSIGNED },
  valor_final: { type: DataTypes.DECIMAL(12, 3).UNSIGNED },
  calificacion: { type: DataTypes.DECIMAL(3, 2) },
  id_tienda: { type: DataTypes.SMALLINT.UNSIGNED },
  direccion: { type: DataTypes.STRING(160) },
  valor_comision: { type: DataTypes.DECIMAL(11, 3) },
  id_user: { type: DataTypes.MEDIUMINT.UNSIGNED },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'pedidos',
  timestamps: false
});

module.exports = Pedido;
