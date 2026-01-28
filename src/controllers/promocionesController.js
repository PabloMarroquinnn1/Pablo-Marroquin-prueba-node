const { Promocion, TiendaPromocion, Tienda } = require('../models');
const { Op } = require('sequelize');

const getPromocionesPorDia = async (req, res) => {
  try {
    const diaNumero = Number(req.params.dia);

    if (!Number.isInteger(diaNumero) || diaNumero < 1 || diaNumero > 7) {
      return res.status(400).json({
        success: false,
        message: 'El día debe ser un número entre 1 (Lunes) y 7 (Domingo)'
      });
    }

    const nombresDias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const nombreDia = nombresDias[diaNumero - 1];

    const fechaActual = new Date();
    const fechaActualStr = fechaActual.toISOString().split('T')[0];

    const promociones = await Promocion.findAll({
      where: { estado: 1 },
      include: [
        {
          model: TiendaPromocion,
          as: 'tienda_promociones',
          where: {
            estado: 1,
            inicio: { [Op.lte]: fechaActualStr },
            fin: { [Op.gte]: fechaActualStr }
          },
          required: false,
          include: [
            {
              model: Tienda,
              as: 'tienda',
              attributes: ['id', 'nombre', 'direccion', 'telefono']
            }
          ]
        }
      ]
    });

    const filtradas = promociones.filter(p => {
      if (!p.dias_semana) return false;
      const diasArray = p.dias_semana.split(',').map(x => x.trim());
      return diasArray[diaNumero - 1] === '1';
    });

    const data = filtradas.map(p => {
      const json = p.toJSON();

      const tiendasDisponibles = (json.tienda_promociones || [])
        .filter(tp => tp.tienda)
        .map(tp => ({
          tienda_id: tp.tienda.id,
          tienda_nombre: tp.tienda.nombre,
          tienda_direccion: tp.tienda.direccion,
          tienda_telefono: tp.tienda.telefono,
          vigencia_inicio: tp.inicio,
          vigencia_fin: tp.fin
        }));

      return {
        id: json.id,
        nombre: json.nombre,
        imagen: json.imagen || null,
        porcentaje_descuento: json.porcentaje,
        dias_semana: json.dias_semana,
        tiendas_disponibles: tiendasDisponibles,
        total_tiendas: tiendasDisponibles.length
      };
    });

    res.json({
      success: true,
      dia_consultado: diaNumero,
      nombre_dia: nombreDia,
      fecha_actual: fechaActualStr,
      total: data.length,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener promociones por día',
      error: error.message
    });
  }
};

module.exports = { getPromocionesPorDia };
